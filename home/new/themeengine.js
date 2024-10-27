import { randomFloat } from "./utils.js";

export const ThemeEngine = {
    // Constants
    PHI: 1.618033988749895,
    TAU: Math.PI * 2,

    // Enhanced color harmony system
    harmony: {
        // Advanced color schemes based on artistic color theory
        schemes: {
            complementary: h => [h, (h + 180) % 360],
            splitComplementary: h => [h, (h + 150) % 360, (h + 210) % 360],
            triadic: h => [h, (h + 120) % 360, (h + 240) % 360],
            tetradic: h => [h, (h + 90) % 360, (h + 180) % 360, (h + 270) % 360],
            analogous: h => [h, (h + 30) % 360, (h + 60) % 360],
        },

        // Generate vibrant yet harmonious colors
        generateHarmony(baseHue, scheme = 'analogous') {
            const hues = this.schemes[scheme](baseHue);
            return hues.map(h => ({
                h,
                // Vary saturation and lightness based on golden ratio
                s: 65 + Math.sin(h * Math.PI / 180) * 15,
                l: 45 + Math.cos(h * Math.PI / 180) * 10
            }));
        },

        // Create aesthetically pleasing variations
        createVariation(color, index) {
            return {
                h: (color.h + index * ThemeEngine.PHI * 20) % 360,
                s: Math.min(100, color.s + index * 5),
                l: Math.max(20, Math.min(80, color.l + index * 3))
            };
        }
    },

    // Advanced animation system using Bézier paths and harmonic motion
    animation: {
        // Bezier curve generator for smooth interpolation
        bezier: {
            points: [
                [0, 0],
                [0.4, 0],
                [0.2, 1],
                [1, 1]
            ],

            evaluate(t) {
                return this.deCasteljau(this.points, t);
            },

            deCasteljau(points, t) {
                if (points.length === 1) return points[0];

                const newPoints = [];
                for (let i = 0; i < points.length - 1; i++) {
                    newPoints.push([
                        points[i][0] + (points[i + 1][0] - points[i][0]) * t,
                        points[i][1] + (points[i + 1][1] - points[i][1]) * t
                    ]);
                }

                return this.deCasteljau(newPoints, t);
            }
        },

        // Harmonic oscillator with damping
        harmonicMotion: {
            create(frequency = 28, damping = 0.8, amplitude = 3) {
                return t => {
                    const omega = frequency * Math.PI * 2;
                    return amplitude * Math.exp(-damping * t) *
                        Math.cos(Math.sqrt(1 - damping * damping) * omega * t);
                };
            }
        },

        // Composite animation function
        compose(...funcs) {
            return t => funcs.reduce((acc, fn) => acc + fn(t), 0) / funcs.length;
        }
    },

    // Enhanced contrast system
    contrast: {
        luminance(r, g, b) {
            const [rs, gs, bs] = [r, g, b].map(c => {
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
        },

        ratio(l1, l2) {
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        },

        // Enhanced contrast adjustment that maintains aesthetic appeal
        ensureContrast(color, background, minRatio = 4.5) {
            const adjustColor = (hsl) => {
                // Preserve hue but adjust saturation and lightness
                const steps = [
                    // Try adjusting lightness first
                    () => ({ ...hsl, l: hsl.l > 50 ? hsl.l + 10 : hsl.l - 10 }),
                    // Then try increasing saturation
                    () => ({ ...hsl, s: Math.min(100, hsl.s + 15) }),
                    // Finally, try both
                    () => ({
                        ...hsl,
                        s: Math.min(100, hsl.s + 10),
                        l: hsl.l > 50 ? Math.min(95, hsl.l + 5) : Math.max(5, hsl.l - 5)
                    })
                ];

                for (const step of steps) {
                    const adjusted = step();
                    const [r, g, b] = this.hslToRgb(adjusted.h, adjusted.s, adjusted.l);
                    const newRatio = this.ratio(
                        this.luminance(r, g, b),
                        this.luminance(...background)
                    );

                    if (newRatio >= minRatio) {
                        return [r, g, b];
                    }
                }

                // If all else fails, return a high contrast color that maintains the hue
                return this.hslToRgb(hsl.h, 85, hsl.l > 50 ? 90 : 10);
            };

            const hsl = this.rgbToHsl(...color);
            return adjustColor(hsl);
        },

        // Color space conversions
        hslToRgb(h, s, l) {
            s /= 100;
            l /= 100;
            const k = n => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            return [f(0), f(8), f(4)];
        },

        rgbToHsl(r, g, b) {
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h = h * 60;
            }

            return { h, s: s * 100, l: l * 100 };
        }
    },

    // Enhanced color generation
    generatePalette(hue, complexity = 0.5) {
        const scheme = complexity < 0.3 ? 'analogous' :
            complexity < 0.6 ? 'splitComplementary' : 'tetradic';

        const harmonyColors = this.harmony.generateHarmony(hue, scheme);
        const colors = harmonyColors.map((color, i) => {
            const variation = this.harmony.createVariation(color, i);
            return this.contrast.hslToRgb(variation.h, variation.s, variation.l);
        });

        // Ensure menu items are both readable and aesthetically pleasing
        const menuItemColor = colors[2]; // Use third color in harmony
        return [
            colors[0], // primary
            colors[1], // accent
            this.contrast.ensureContrast(menuItemColor, colors[0], 0.9),
            colors[3] || this.contrast.ensureContrast(colors[1], colors[0]) // hover
        ];
    },

    // Enhanced animation application
    apply(hue = randomFloat({
        minDifference: 0.5,
        entropyFactor: 3
    }) * 360) {
        const colors = this.generatePalette(hue);
        const root = document.documentElement;
        const current = {};
        const keys = ['primary', 'accent', 'menu-items', 'hover'];

        keys.forEach((key, i) => {
            const cur = getComputedStyle(root).getPropertyValue(`--${key}-color`);
            current[key] = cur ? this.hexToRGB(cur) : colors[i];
        });

        // Create composite animation function
        const animationFn = this.animation.compose(
            t => this.animation.bezier.evaluate(t)[1],
            this.animation.harmonicMotion.create(1.5, 0.3, 0.15)
        );

        let start = null;
        const duration = 300; // Longer duration for smoother transition

        const animate = (now) => {
            if (!start) start = now;
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);

            // Apply sophisticated easing
            const easedT = animationFn(t);

            keys.forEach((key, i) => {
                const rgb = this.lerp(current[key], colors[i], easedT);
                root.style.setProperty(
                    `--${key}-color`,
                    `rgb(${rgb.map(x => Math.round(x * 255)).join(',')})`
                );
            });

            if (t < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        return colors;
    },

    // Utility methods (keep existing ones and add new ones as needed)
    lerp(c1, c2, t) {
        return c1.map((start, i) => start + (c2[i] - start) * t);
    },

    hexToRGB(hex) {
        const val = parseInt(hex.replace(/^#/, ''), 16);
        return [
            ((val >> 16) & 255) / 255,
            ((val >> 8) & 255) / 255,
            (val & 255) / 255
        ];
    },

    // Theme history management
    _themeHistory: {
        maxSize: 5,
        hues: [],
        schemes: [],

        addTheme(hue, scheme) {
            this.hues.push(hue);
            this.schemes.push(scheme);

            // Keep history within max size
            if (this.hues.length > this.maxSize) {
                this.hues.shift();
                this.schemes.shift();
            }
        },

        isHueSimilar(newHue) {
            return this.hues.some(oldHue => {
                const diff = Math.abs(newHue - oldHue);
                // Consider hues similar if within 30 degrees or wrapped around (330 degrees)
                return diff < 30 || diff > 330;
            });
        },

        clear() {
            this.hues = [];
            this.schemes = [];
        }
    },

    // Enhanced color generation with scheme tracking
    generatePalette(hue, complexity = 0.5) {
        const scheme = complexity < 0.3 ? 'analogous' :
            complexity < 0.6 ? 'splitComplementary' : 'tetradic';

        // Store the theme in history
        this._themeHistory.addTheme(hue, scheme);

        const harmonyColors = this.harmony.generateHarmony(hue, scheme);
        const colors = harmonyColors.map((color, i) => {
            const variation = this.harmony.createVariation(color, i);
            return this.contrast.hslToRgb(variation.h, variation.s, variation.l);
        });

        // Ensure menu items are both readable and aesthetically pleasing
        const menuItemColor = colors[2];
        return [
            colors[0], // primary
            colors[1], // accent
            this.contrast.ensureContrast(menuItemColor, colors[0], 0.9),
            colors[3] || this.contrast.ensureContrast(colors[1], colors[0]) // hover
        ];
    },

    // Generate a new hue that's distinctly different from recent ones
    _generateDistinctHue() {
        const maxAttempts = 10;
        let attempts = 0;
        let newHue;

        do {
            // Generate a new random hue
            newHue = randomFloat({
                minDifference: 0.5,
                entropyFactor: 3
            }) * 360;

            attempts++;
        } while (
            this._themeHistory.isHueSimilar(newHue) &&
            attempts < maxAttempts
        );

        // If we couldn't find a distinct hue after max attempts,
        // use golden ratio to guarantee a different feel
        if (attempts >= maxAttempts) {
            const lastHue = this._themeHistory.hues[this._themeHistory.hues.length - 1] || 0;
            newHue = (lastHue + this.PHI * 180) % 360;
        }

        return newHue;
    },

    // Cycle to a new theme that's distinctly different from recent ones
    cycleTheme() {
        const newHue = this._generateDistinctHue();

        // Vary complexity based on previous schemes to avoid repetition
        const lastScheme = this._themeHistory.schemes[this._themeHistory.schemes.length - 1];
        let complexity;

        if (lastScheme === 'analogous') {
            complexity = 0.7; // Go for a more complex scheme
        } else if (lastScheme === 'tetradic') {
            complexity = 0.2; // Go for a simpler scheme
        } else {
            complexity = 0.5; // Use middle complexity
        }

        return this.apply(newHue, complexity);
    },

    // Enhanced apply method to accept complexity parameter
    apply(hue = this._generateDistinctHue(), complexity = 0.5) {
        const colors = this.generatePalette(hue, complexity);
        const root = document.documentElement;
        const current = {};
        const keys = ['primary', 'accent', 'menu-items', 'hover'];

        keys.forEach((key, i) => {
            const cur = getComputedStyle(root).getPropertyValue(`--${key}-color`);
            current[key] = cur ? this.hexToRGB(cur) : colors[i];
        });

        // Create composite animation function
        const animationFn = this.animation.compose(
            t => this.animation.bezier.evaluate(t)[1],
            this.animation.harmonicMotion.create(1.5, 0.3, 0.15)
        );

        let start = null;
        const duration = 300;

        const animate = (now) => {
            if (!start) start = now;
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const easedT = animationFn(t);

            keys.forEach((key, i) => {
                const rgb = this.lerp(current[key], colors[i], easedT);
                root.style.setProperty(
                    `--${key}-color`,
                    `rgb(${rgb.map(x => Math.round(x * 255)).join(',')})`
                );
            });

            if (t < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
        return colors;
    },

    // ... (existing utility methods remain the same)

    // Reset theme history
    resetThemeHistory() {
        this._themeHistory.clear();
    }
};

if (typeof window !== 'undefined') window.ThemeEngine = ThemeEngine;