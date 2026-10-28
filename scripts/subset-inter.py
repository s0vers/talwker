"""Split the initial Latin font without dropping the remaining character coverage.

Optional tooling: pip install fonttools==4.66.1 brotli==1.2.1
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "public/fonts/inter-variable-latin.woff2"
TARGET = ROOT / "public/fonts/inter-latin-core.woff2"


def is_core(codepoint: int) -> bool:
    return (
        codepoint <= 0x7F
        or codepoint in {0xa1, 0xb0, 0xb7, 0xba, 0xbf, 0xc1, 0xc9, 0xcd, 0xd3, 0xda, 0xe1, 0xe9, 0xed, 0xf1, 0xf3, 0xf8, 0xfa, 0x2014, 0x201c, 0x201d, 0x2026, 0x2192, 0x2212}
        or 0x2010 <= codepoint <= 0x2015
        or 0x2018 <= codepoint <= 0x201F
        or codepoint in {0xA9, 0xB0, 0xB7, 0x2022, 0x2026, 0x20AC, 0x2122, 0x2212}
    )


def main() -> None:
    font = TTFont(SOURCE, recalcTimestamp=False)
    options = subset.Options()
    options.layout_features = ["calt", "kern", "locl"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=[cp for cp in font.getBestCmap() if is_core(cp)])
    subsetter.subset(font)
    font.flavor = "woff2"
    font.save(TARGET)
    print(f"Generated {TARGET.relative_to(ROOT)} ({TARGET.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
