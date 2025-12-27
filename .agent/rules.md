# Agent Rules for NFS Photography Portfolio

## CSS Image Aspect Ratio Preservation

**CRITICAL RULE**: When modifying any CSS files, especially those related to images, you MUST preserve aspect ratios using `object-fit: cover;` or `object-fit: contain;` as appropriate.

### Required Image Styling Rules:

1. **Gallery Images**: Always use `object-fit: cover;` to maintain aspect ratio while filling the container
   ```css
   .gallery-item img {
       object-fit: cover; /* REQUIRED */
   }
   ```

2. **Lightbox Images**: Always use `object-fit: contain;` to preserve full image visibility
   ```css
   .lightbox img {
       object-fit: contain; /* REQUIRED */
   }
   ```

3. **Hero Images**: Maintain `object-fit: cover;` for background hero images
   ```css
   .hero-image {
       object-fit: cover; /* REQUIRED */
   }
   ```

### What NOT to Do:

❌ Never remove `object-fit` properties from image styles
❌ Never set images to `width: auto` or `height: auto` without `object-fit`
❌ Never use `transform: scale()` without maintaining the base `object-fit` property
❌ Never apply `background-size: 100% 100%` which stretches images

### What TO Do:

✅ Always include `object-fit: cover;` for cropped/filled images
✅ Always include `object-fit: contain;` for full-view images
✅ Use `aspect-ratio` property to define container proportions
✅ Add comments like `/* CRITICAL: Preserves aspect ratio */` for clarity

## Photography Metadata Display

When working with photography portfolio galleries:

1. **Desktop**: Show metadata on hover only (clean gallery view)
2. **Mobile**: Always show metadata (no hover capability)
3. **Format**: Use monospace fonts (Roboto Mono, Courier) for technical data
4. **Color**: Use low-contrast colors (#888) so metadata is readable but subtle
5. **Layout**: Use pipe separators (|) for clean data presentation

Example format:
```
ISO 100 | 85mm | f/1.8 | 1/1000s
```

## Responsive Images

Always implement srcset for responsive image loading:

```html
<img 
  src="image.jpg"
  srcset="image.jpg?w=400 400w, image.jpg?w=800 800w, image.jpg?w=1200 1200w"
  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
  alt="Description"
/>
```

This ensures:
- Small images load on mobile devices (faster, less data)
- Large images load on desktop (better quality)
- Optimal performance across all devices
