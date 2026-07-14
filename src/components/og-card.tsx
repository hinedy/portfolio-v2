const DEFAULT_TITLE = "Software gets complicated long before it gets big.";

export function OgCard({ title = DEFAULT_TITLE }: { title?: string }) {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "#faf5f6",
        padding: "72px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <h1
        style={{
          fontFamily: "Big Shoulders Display",
          fontWeight: 900,
          fontSize: "104px",
          color: "#17120d",
          letterSpacing: "-0.03em",
          lineHeight: "0.85",
          margin: 0,
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <span
          style={{
            fontFamily: "Space Mono",
            fontSize: "14px",
            color: "#17120d",
          }}
        >
          Ahmed Hinedy — Product Frontend Engineer
        </span>
        <div
          style={{
            width: 3,
            height: 26,
            backgroundColor: "#ed5f18",
          }}
        />
      </div>
    </div>
  );
}
