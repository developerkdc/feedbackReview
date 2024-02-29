import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const CreditScoreChart = ({ score, mallId }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [star1And2Count, setStar1And2Count] = useState(0);
  const [star4And5Count, setStar4And5Count] = useState(0);
  const [totalStarCount, setTotalStarCount] = useState(0);
  const [detractor,setDetractor] = useState(0)
  const [promoter, setPromoter] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios(
          `${process.env.REACT_APP_URL}/graph/mallTotalStar?id=${mallId}`
        );
        const data = response.data?.Data || [];
        setFeedbackData(data);
        let count1And2 = 0;
        let count4And5 = 0;
        data.forEach((feedback) => {
          if (feedback?._id?.star === "1" || feedback?._id?.star === "2") {
            count1And2 = count1And2 + feedback?.totalStar;
          } else if (
            feedback?._id?.star === "4" ||
            feedback?._id?.star === "5"
          ) {
            count4And5 = count4And5 + feedback?.totalStar;
          }
        });
        setStar1And2Count(count1And2);
        setStar4And5Count(count4And5);
        let totalStar = 0;
        data.forEach((feedback) => {
          totalStar += feedback.totalStar;
        });
        setTotalStarCount(totalStar);
      } catch (error) {
        console.error(error);
      }
    })();
    
      Detractor();
  }, [mallId]);
  const Detractor = ()=>{
    console.log("Detractor", star1And2Count, "erwer", totalStarCount);
    let percentage = ((star1And2Count/totalStarCount)*100);
    setDetractor(percentage)
  }
  console.log(detractor,"--------------ddddddddddddddddd");
  return (
    <div>
      <ReactSpeedometer
        value={score}
        maxSegmentLabels={0}
        segments={4}
        ringWidth={20}
        needleColor={"#555"}
        needleHeightRatio={0.5}
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        segmentColors={["#8DCD03", "#8DCD03", "#8DCD03", "#ECECEC"]}
        currentValueText={`${score}`}
        valueTextFontSize={"18px"}
        valueTextFontWeight={"normal"}
        textColor={"#6200EE"}
        width={250}
        height={150}
      />
      <div>
        <p>Star 1 and 2 Count: {star1And2Count}</p>
        <p>Star 4 and 5 Count: {star4And5Count}</p>
        <p>Total Star Count: {totalStarCount}</p>
      </div>
    </div>
  );
};

export default CreditScoreChart;
