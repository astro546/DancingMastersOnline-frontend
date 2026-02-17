import React from 'react';
import { useEffect } from 'react';

function BPMDisplayer({ bpms }: { bpms: { beat: number; bpm: number }[] }) {
  const [currentBPM, setCurrentBPM] = React.useState<number | null>(null);
  //console.log('BPMDisplayer rendered with bpms:', bpms);

  useEffect(() => {
    if (bpms.length < 1) return;

    const bpmsArray = bpms.reduce((acc, bpmRecord) => {
      acc.push(bpmRecord.bpm);
      return acc;
    }, [] as number[]);

    const minBpm = Math.min(...bpmsArray);
    const maxBpm = Math.max(...bpmsArray);

    if (minBpm === maxBpm) {
      setCurrentBPM(minBpm);
    }

    const intervalId = setInterval(() => {
      if (bpms.length > 1) {
        const randomBpm = Math.round(
          Math.floor(Math.random() * (maxBpm - minBpm + 1)) + minBpm,
        );
        setCurrentBPM(randomBpm);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [bpms]);

  return <span>BPM: {currentBPM}</span>;
}

export default BPMDisplayer;
