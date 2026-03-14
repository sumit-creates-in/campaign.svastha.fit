import fs from "fs";
import path from "path";

const baseHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    {{META_TAGS}}
    <meta name="author" content="Svastha Wellness" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Meta Pixel Code -->
    <script>
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js",
      );
      fbq("init", "4183888118531938");
      fbq("track", "PageView");
    </script>
    <!-- End Meta Pixel Code -->
    <meta
      name="facebook-domain-verification"
      content="epa5aqkzicp0x1rv12g1nauo95ftsf"
    />
    {{VITE_ASSETS}}
  </head>

  <body>
    <!-- Meta Pixel noscript fallback -->
    <noscript>
      <img
        height="1"
        width="1"
        style="display: none"
        src="https://www.facebook.com/tr?id=4183888118531938&ev=PageView&noscript=1"
      />
    </noscript>

    <div id="root"></div>
    {{VITE_SCRIPTS}}
  </body>
</html>`;

const routes = {
  "14-Day-Yoga-Fat-Loss-Camp": {
    title: "14-Day Yoga Fat Loss Camp | Transform Your Body in 14 Days",
    description:
      "Join our intensive 14-Day Yoga Fat Loss Camp. Proven yoga techniques for rapid fat loss, daily live classes, expert guidance, and guaranteed results. Register now!",
    ogTitle: "14-Day Yoga Fat Loss Camp | Svastha Wellness",
    ogDescription:
      "Transform your body in just 14 days with our intensive yoga fat loss program. Daily live classes, expert instructors, and proven results.",
    ogImage: "https://campaign.svastha.fit/hero-yoga.jpg",
  },
  "14-Day-Yoga-Fat-Loss-Camp-int": {
    title: "14-Day Yoga Fat Loss Camp | Transform Your Body in 14 Days",
    description:
      "Join our intensive 14-Day Yoga Fat Loss Camp. Proven yoga techniques for rapid fat loss, daily live classes, expert guidance, and guaranteed results. Register now!",
    ogTitle: "14-Day Yoga Fat Loss Camp | Svastha Wellness",
    ogDescription:
      "Transform your body in just 14 days with our intensive yoga fat loss program. Daily live classes, expert instructors, and proven results.",
    ogImage: "https://campaign.svastha.fit/hero-yoga.jpg",
  },
  "healthy-life-by-sumit": {
    title: "14-Day Healthy Life Transformation | Sumit's Yoga Program",
    description:
      "Transform your life in 14 days with Sumit's proven yoga and wellness program. Daily guidance, healthy habits, and sustainable lifestyle changes.",
    ogTitle: "14-Day Healthy Life Transformation | Sumit's Program",
    ogDescription:
      "Join Sumit's 14-day transformation program. Yoga, wellness, and healthy lifestyle changes that last a lifetime.",
    ogImage: "https://campaign.svastha.fit/sumit-sharma.png",
  },
  "weight-loss-consultation-with-expert": {
    title: "Free Weight Loss Consultation with Expert | Svastha Wellness",
    description:
      "Get personalized weight loss guidance from certified experts. Free consultation to create your custom transformation plan. Book your session now!",
    ogTitle: "Free Weight Loss Consultation | Expert Guidance",
    ogDescription:
      "Get personalized weight loss guidance from certified experts. Free consultation to create your custom transformation plan.",
    ogImage: "https://campaign.svastha.fit/sumit-sharma.png",
  },
  "12-week-Total-Body-Transformation-Program": {
    title: "12-Week Total Body Transformation Program | Svastha Wellness",
    description:
      "Complete 12-week body transformation program with yoga, nutrition, and lifestyle coaching. Guaranteed results with expert guidance and community support.",
    ogTitle: "12-Week Total Body Transformation | Svastha Wellness",
    ogDescription:
      "Complete 12-week body transformation program with yoga, nutrition, and lifestyle coaching. Guaranteed results with expert guidance.",
    ogImage: "https://campaign.svastha.fit/sumit-sharma.png",
  },
};

// Check if dist directory exists
if (!fs.existsSync("dist")) {
  console.error('dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Read the main index.html to extract Vite-generated assets and scripts
const mainIndexPath = path.join("dist", "index.html");
if (!fs.existsSync(mainIndexPath)) {
  console.error(
    'Main index.html not found in dist directory. Please run "npm run build" first.',
  );
  process.exit(1);
}

const mainIndexContent = fs.readFileSync(mainIndexPath, "utf-8");

// Extract CSS and JS assets from the main index.html
const cssMatch = mainIndexContent.match(/<link[^>]*rel="stylesheet"[^>]*>/g);
const jsMatch = mainIndexContent.match(
  /<script[^>]*type="module"[^>]*><\/script>/g,
);

const viteAssets = cssMatch ? cssMatch.join("\n    ") : "";
const viteScripts = jsMatch ? jsMatch.join("\n    ") : "";

// Generate HTML files for each route
Object.entries(routes).forEach(([route, meta]) => {
  const metaTags = `
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}" />
    
    <meta property="og:title" content="${meta.ogTitle}" />
    <meta property="og:description" content="${meta.ogDescription}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${meta.ogImage}" />
    <meta property="og:url" content="https://campaign.svastha.fit/${route}/" />
    
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@SvasthaWellness" />
    <meta name="twitter:title" content="${meta.ogTitle}" />
    <meta name="twitter:description" content="${meta.ogDescription}" />
    <meta name="twitter:image" content="${meta.ogImage}" />
  `;

  const html = baseHtml
    .replace("{{META_TAGS}}", metaTags)
    .replace("{{VITE_ASSETS}}", viteAssets)
    .replace("{{VITE_SCRIPTS}}", viteScripts);

  // Create directory for the route
  const routeDir = path.join("dist", route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  // Write the HTML file
  fs.writeFileSync(path.join(routeDir, "index.html"), html);
  console.log(`Generated: ${route}/index.html`);
});

console.log("Static pages generated successfully!");
