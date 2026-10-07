"""Remove the white matte from the official ICRA 2027 logo derivative.

The original stays untouched. Recover foreground RGB from a white matte so
antialiased edges do not leave a white halo on the homepage's gray paper.
"""
from pathlib import Path

from PIL import Image


def main():
    assets = Path(__file__).resolve().parents[1] / "assets" / "img"
    source = Image.open(assets / "icra27-logo.webp").convert("RGB")
    result = Image.new("RGBA", source.size)
    pixels = []
    for red, green, blue in source.get_flattened_data():
        minimum = min(red, green, blue)
        if minimum >= 246:
            pixels.append((0, 0, 0, 0))
            continue
        alpha = 255 - minimum
        foreground = tuple(
            round(255 * (channel - minimum) / alpha)
            for channel in (red, green, blue)
        )
        pixels.append((*foreground, alpha))
    result.putdata(pixels)
    target = assets / "icra27-logo-transparent.png"
    result.save(target, optimize=True)
    print(f"Saved {target.name}: {result.size}, alpha={result.getchannel('A').getextrema()}")


if __name__ == "__main__":
    main()
