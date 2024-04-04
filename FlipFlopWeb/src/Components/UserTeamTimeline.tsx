import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Card, CardContent } from '@mui/material';
import { UserTeamTimelineProps } from '../Interfaces/UserTeamTimelineProps';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { FaArrowsLeftRight } from "react-icons/fa6";

const UserTeamTimeline: React.FC<{ timeline: UserTeamTimelineProps[] }> = ({ timeline }) => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999', }}>
    <Card>
    <CardContent>
    <Timeline>
      {timeline.map((item, index) => (
        <TimelineItem key={index}>
        <TimelineOppositeContent color="text.secondary" sx={{ fontSize: '8px' }}>
          {item.time}
        </TimelineOppositeContent>
          <TimelineSeparator>
          <TimelineDot color="grey" >
            <FaArrowsLeftRight />
          </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>{item.team}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>

    </CardContent>
    </Card>
    </div>
  );
}

export default UserTeamTimeline;