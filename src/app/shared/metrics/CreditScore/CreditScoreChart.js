import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";

const CreditScoreChart = ({ score, mallId }) => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [star1And2Count, setStar1And2Count] = useState(0);
  const [star4And5Count, setStar4And5Count] = useState(0);
  const [totalStarCount, setTotalStarCount] = useState(0);
  const [detractor, setDetractor] = useState(0);
  const [promoter, setPromoter] = useState(0);
  const [nps, setNps] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios(
          `https://feedbackreviewbackend.onrender.com/graph/mallTotalStar?id=${mallId}`
        );
        const data = response.data?.Data || [];
        setFeedbackData(data);
        let count1And2 = 0;
        let count4And5 = 0;
        data.forEach((feedback) => {
          if (feedback?._id?.star === "1" || feedback?._id?.star === "2") {
            count1And2 += feedback?.totalStar;
          } else if (
            feedback?._id?.star === "4" ||
            feedback?._id?.star === "5"
          ) {
            count4And5 += feedback?.totalStar;
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
  }, [mallId]);

  useEffect(() => {
    if (star1And2Count > 0) {
      let percentage = (star1And2Count / totalStarCount) * 100;
      setDetractor(percentage);
    }
    if (star4And5Count > 0) {
      let percentage = (star4And5Count / totalStarCount) * 100;
      setPromoter(percentage);
    }
  }, [star1And2Count, star4And5Count, totalStarCount]);

  useEffect(() => {
    const npsValue = Math.round(promoter - detractor);
    setNps(npsValue);
  }, [promoter, detractor]);
  const clampedNPS = Math.min(Math.max(nps, -100), 100);

  return (
    <div>
      <ReactSpeedometer
        value={clampedNPS}
        maxSegmentLabels={2}
        segments={2}
        ringWidth={40}
        minValue={-100}
        maxValue={100}
        needleColor={"#555"}
        needleHeightRatio={0.5}
        needleTransitionDuration={4000}
        needleTransition="easeElastic"
        segmentColors={["#FF0000", "#99FF00"]}
        currentValueText={clampedNPS.toString()}
        valueTextFontSize={"18px"}
        valueTextFontWeight={"normal"}
        textColor={"#6200EE"}
        width={250}
        height={150}
      />
    </div>
  );
};

export default CreditScoreChart;
