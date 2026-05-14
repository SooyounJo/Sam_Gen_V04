export default function DotRunningCoach() {
  return (
    <div
      style={{
        position: "relative",
        width: "297px",
        height: "75px",
        background: "#FFFFFF",
        borderRadius: "93px",
        overflow: "hidden",
      }}
    >
      {/* Icon Circle */}
      <div
        style={{
          position: "absolute",
          width: "50px",
          height: "50px",
          left: "15px",
          top: "13px",
          background: "#FFB01C",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Simplified Shoe/Runner Icon using CSS or SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.5 5.5C13.5 6.32843 12.8284 7 12 7C11.1716 7 10.5 6.32843 10.5 5.5C10.5 4.67157 11.1716 4 12 4C12.8284 4 13.5 4.67157 13.5 5.5Z" fill="white"/>
          <path d="M15.5 10.5L13.5 12.5V17.5C13.5 18.3284 12.8284 19 12 19C11.1716 19 10.5 18.3284 10.5 17.5V14.5L8.5 12.5L6.5 14.5C5.94772 15.0523 5.05228 15.0523 4.5 14.5C3.94772 13.9477 3.94772 13.0523 4.5 12.5L7.5 9.5C8.05228 8.94772 8.94772 8.94772 9.5 9.5L11.5 11.5L12.5 10.5L10.5 8.5C9.94772 7.94772 9.94772 7.05228 10.5 6.5C11.0523 5.94772 11.9477 5.94772 12.5 6.5L16.5 10.5C17.0523 11.0523 17.0523 11.9477 16.5 12.5C15.9477 13.0523 15.0523 13.0523 14.5 12.5L13.5 11.5V10.5H15.5Z" fill="white"/>
        </svg>
      </div>

      {/* Text Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          position: "absolute",
          width: "142px",
          height: "40px",
          left: "83px",
          top: "calc(50% - 40px/2)",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "130%",
            color: "#1B1C21",
          }}
        >
          Running coach
        </div>
        <div
          style={{
            fontFamily: "Pretendard, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "14px",
            color: "#949494",
            marginTop: "2px",
          }}
        >
          달릴 준비 되셨나요?
        </div>
      </div>

      {/* Dots Arrow */}
      <div
        style={{
          position: "absolute",
          left: "245px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          width: "30px",
          height: "30px",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Horizontal line of dots */}
          <circle cx="4" cy="15" r="2.1" fill="#1B1C21" />
          <circle cx="8.2" cy="15" r="2.1" fill="#1B1C21" />
          <circle cx="12.4" cy="15" r="2.1" fill="#1B1C21" />
          <circle cx="16.6" cy="15" r="2.1" fill="#1B1C21" />
          <circle cx="20.8" cy="15" r="2.1" fill="#1B1C21" />
          <circle cx="25" cy="15" r="2.1" fill="#1B1C21" />
          <circle cx="29.2" cy="15" r="2.1" fill="#1B1C21" />
          
          {/* Top diagonal dots */}
          <circle cx="25" cy="10.8" r="2.1" fill="#1B1C21" />
          <circle cx="20.8" cy="6.6" r="2.1" fill="#1B1C21" />
          
          {/* Bottom diagonal dots */}
          <circle cx="25" cy="19.2" r="2.1" fill="#1B1C21" />
          <circle cx="20.8" cy="23.4" r="2.1" fill="#1B1C21" />
        </svg>
      </div>
    </div>
  );
}
