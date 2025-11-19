export function BackgroundGradients() {
  return (
    <div className="fixed inset-0 opacity-60 pointer-events-none">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse 1055px 658px at 808px 759px, rgba(24, 180, 244, 0.5) 0%, rgba(46, 55, 114, 0) 63%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse 842px 410px at 657px 910px, rgba(172, 127, 244, 0.6) 0%, rgba(21, 25, 52, 0) 100%)",
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-full h-full"
        style={{
          background:
            "radial-gradient(circle 734px at 920px 1044px, rgba(155, 93, 254, 0.6) 5%, rgba(172, 127, 244, 0) 80%)",
        }}
      />
    </div>
  );
}
