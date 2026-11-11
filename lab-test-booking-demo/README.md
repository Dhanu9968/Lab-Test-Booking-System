# Lab Test Booking System – React 3D Demo

## Run the project

1. Install Node.js (LTS) if it is not already installed.
2. Extract this ZIP file.
3. Open the extracted folder in VS Code.
4. Open the VS Code terminal in this folder.
5. Run:

```bash
npm install
npm run dev
```

6. Open the local URL shown in the terminal (usually http://localhost:5173).

## Included features

- 3D animated organ scene using React Three Fiber and Three.js.
- Select Diabetes, Liver, Thyroid, Kidney, Heart, Lungs, Bone, Pregnancy or Cancer.
- Each category displays a sample list of related tests.
- Add/remove tests in the cart and calculate the total.
- Patient details form with basic browser validation.
- Appointment date, collection preference and time-slot selection.
- Booking confirmation with a demo booking ID.

## Important notes

- This is a frontend demonstration. It does not connect to a real laboratory, database, payment gateway, SMS service or booking API.
- The 3D anatomy objects are stylized procedural models made from Three.js geometry, not clinical-grade anatomical models.
- Test names and prices are sample demo data. Confirm the correct tests and prices with the client before production.
- The header location and phone number are placeholder content; replace them with approved project details or remove them.

## Add to an existing Vite React project

If you already have a Vite React project, copy `src/App.jsx`, `src/App.css`, `src/OrganScene.jsx` and `src/main.jsx` into your project's `src` folder. Install the dependencies listed in `package.json`:

```bash
npm install three @react-three/fiber@^8 @react-three/drei@^9 lucide-react
```

Make sure `main.jsx` imports `./App.css` and renders `App`.
