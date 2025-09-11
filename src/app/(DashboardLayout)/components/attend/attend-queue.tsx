
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
    Timeline,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    timelineOppositeContentClasses,
} from '@mui/lab';
import { Button, Link, Typography } from '@mui/material';

const AttendQueue = () => {
    return (
        <DashboardCard title="attending to queue #w1234123523432">
            <>
                <Timeline
                    className="theme-timeline"
                    nonce={undefined}
                    onReset={undefined}
                    onResetCapture={undefined}
                    sx={{
                        p: 0,
                        mb: '-40px',
                        '& .MuiTimelineConnector-root': {
                            width: '1px',
                            backgroundColor: '#efefef'
                        },
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.5,
                            paddingLeft: 0,
                        },
                    }}
                >
                    {
                        new Array(6).fill(0).map(() =>
                            <TimelineItem>
                                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot color="primary" variant="outlined" />
                                    <TimelineConnector />
                                </TimelineSeparator>

                                <TimelineContent> <span style={{ marginRight: 100, marginLeft: 100 }}>1</span>Payment received from John Doe of $385.90</TimelineContent>
                            </TimelineItem>
                        )
                    }
                </Timeline>
                <Button variant="contained" component={Link} href="/authentication/login" disableElevation color="primary" >
                    Finish Queue
                </Button>
            </>
        </DashboardCard>
    );
};

export default AttendQueue;