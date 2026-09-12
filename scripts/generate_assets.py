"""
Every texture and cover on this site is generated here, from code, seeded by a
string so the same input always draws the same image. Nothing is stock, nothing
is scraped. Run: python3 scripts/generate_assets.py
"""
from __future__ import annotations

import hashlib
import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "generated")
os.makedirs(OUT, exist_ok=True)

PAPER = (247, 245, 241)
PAPER_DEEP = (239, 235, 227)
INK = (17, 17, 16)
INK_SOFT = (67, 67, 67)
ACCENT = (237, 104, 43)
HIGHLIGHT = (252, 225, 156)


def rng(seed: str) -> np.random.Generator:
    h = hashlib.sha256(seed.encode()).digest()
    return np.random.default_rng(int.from_bytes(h[:8], "big"))


def value_noise(shape, scale, gen) -> np.ndarray:
    """Smooth value noise: a small random lattice, bilinearly upsampled."""
    h, w = shape
    gh, gw = max(2, int(h / scale)), max(2, int(w / scale))
    grid = gen.random((gh, gw))
    img = Image.fromarray((grid * 255).astype("uint8")).resize((w, h), Image.BICUBIC)
    return np.asarray(img, dtype=np.float32) / 255.0


def fbm(shape, gen, octaves=4, scale=180.0) -> np.ndarray:
    total = np.zeros(shape, dtype=np.float32)
    amp, norm, s = 1.0, 0.0, scale
    for _ in range(octaves):
        total += amp * value_noise(shape, s, gen)
        norm += amp
        amp *= 0.5
        s /= 2.0
    return total / norm


def paper_fibre(size=(512, 512), seed="fibre") -> Image.Image:
    """Tileable paper grain, multiplied over the page ground."""
    gen = rng(seed)
    h, w = size[1], size[0]
    base = fbm((h, w), gen, octaves=5, scale=40)
    fibres = value_noise((h, w), 2.2, gen)
    field = np.clip(base * 0.55 + fibres * 0.45, 0, 1)
    field = 0.86 + field * 0.14
    arr = (np.dstack([field, field, field]) * 255).astype("uint8")
    img = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(0.4))
    img.save(os.path.join(OUT, "paper-fibre.png"), optimize=True)
    return img


def coffee_ring(size=520, seed="coffee") -> Image.Image:
    """A ring left by a mug: dark rim, lighter centre, broken edge."""
    gen = rng(seed)
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    cx = cy = size / 2
    r = size * 0.38
    for i in range(240):
        a = (i / 240) * math.tau
        wobble = 1 + (fbm((1, 240), gen, octaves=3, scale=30)[0][i] - 0.5) * 0.09
        rr = r * wobble
        width = 4 + gen.random() * 7
        alpha = int(38 + gen.random() * 46)
        x, y = cx + math.cos(a) * rr, cy + math.sin(a) * rr
        draw.ellipse(
            [x - width, y - width, x + width, y + width],
            fill=(120, 82, 48, alpha),
        )
    wash = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(wash).ellipse(
        [cx - r * 0.92, cy - r * 0.92, cx + r * 0.92, cy + r * 0.92],
        fill=(140, 102, 64, 16),
    )
    img = Image.alpha_composite(wash, img).filter(ImageFilter.GaussianBlur(1.6))
    img.save(os.path.join(OUT, "coffee-ring.png"), optimize=True)
    return img


def flow_cover(seed: str, name: str, size=(1200, 750), accent_share=0.18):
    """
    A cover drawn as ink carried by a flow field. Same seed, same drawing, so a
    post keeps its cover forever and nobody else's post can collide with it.
    """
    w, h = size
    gen = rng(seed)
    field = fbm((h // 4, w // 4), gen, octaves=4, scale=60) * math.tau * 2

    img = Image.new("RGB", (w, h), PAPER)
    grain = paper_fibre((w, h), seed=f"{seed}-grain").convert("RGB")
    img = Image.blend(img, grain, 0.18)
    draw = ImageDraw.Draw(img, "RGBA")

    n_lines = 620
    for i in range(n_lines):
        x = gen.random() * w
        y = gen.random() * h
        use_accent = gen.random() < accent_share
        colour = ACCENT if use_accent else INK_SOFT
        # Measured at 241/255 mean luminance on the first pass, which reads as a
        # blank page on a warm ground. The ink goes on heavier now.
        alpha = int(70 + gen.random() * (170 if use_accent else 130))
        steps = int(120 + gen.random() * 260)
        width = 2 if not use_accent else 3
        pts = []
        for _ in range(steps):
            gx, gy = min(int(x / 4), field.shape[1] - 1), min(int(y / 4), field.shape[0] - 1)
            if gx < 0 or gy < 0:
                break
            a = field[gy][gx]
            x += math.cos(a) * 3.2
            y += math.sin(a) * 3.2
            if not (0 <= x < w and 0 <= y < h):
                break
            pts.append((x, y))
        if len(pts) > 3:
            draw.line(pts, fill=(*colour, alpha), width=width, joint="curve")

    # a few resting dots, like ink that pooled
    for _ in range(int(14 + gen.random() * 10)):
        x, y = gen.random() * w, gen.random() * h
        r = 1.5 + gen.random() * 3.5
        draw.ellipse([x - r, y - r, x + r, y + r], fill=(*INK, 70))

    img = img.filter(ImageFilter.GaussianBlur(0.3))
    path = os.path.join(OUT, f"{name}.jpg")
    img.save(path, quality=82, optimize=True)
    return path


def torn_edge(seed="torn", size=(1200, 60)):
    """A torn paper edge, used at section seams and on the 404."""
    w, h = size
    gen = rng(seed)
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    noise = fbm((1, w), gen, octaves=4, scale=40)[0]
    pts = [(x, h * 0.35 + noise[x] * h * 0.5) for x in range(w)]
    draw.polygon([(0, 0), *pts, (w, 0)], fill=(*PAPER, 255))
    img = img.filter(ImageFilter.GaussianBlur(0.4))
    img.save(os.path.join(OUT, "torn-edge.png"), optimize=True)


def stamp_texture(seed="stamp", size=(520, 200)):
    """Broken rubber-stamp ink, multiplied under the ACCEPTED stamp."""
    w, h = size
    gen = rng(seed)
    field = fbm((h, w), gen, octaves=4, scale=22)
    mask = (field > 0.46).astype("uint8") * 255
    img = Image.fromarray(mask).convert("L")
    img.save(os.path.join(OUT, "stamp-mask.png"), optimize=True)


if __name__ == "__main__":
    paper_fibre()
    coffee_ring()
    torn_edge()
    stamp_texture()
    covers = [
        ("dead-provider-account", "cover-dead-provider-account"),
        ("fake-bank-details", "cover-fake-bank-details"),
        ("asymmetric-deploy", "cover-asymmetric-deploy"),
        ("thirteen-rules", "cover-thirteen-rules"),
        ("silent-model-switch", "cover-silent-model-switch"),
        ("cetus", "cover-cetus"),
        ("kairo", "cover-kairo"),
        ("mailtrail", "cover-mailtrail"),
        ("console-marketplace", "cover-console-marketplace"),
        ("cyberbrain-ids", "cover-cyberbrain-ids"),
        ("a-hqca", "cover-a-hqca"),
    ]
    for seed, name in covers:
        print("drew", flow_cover(seed, name))
