"use client"
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { start_next, completed } from "@/lib/requests"
import { QueueMember } from '@/types/queue_member';
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
import { Button, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

type buttonOptionsProps = "Start" | "Next" | "Finish"
type responseObj = {
    message: string
    queue_member?: QueueMember
}

const AttendQueue = ({ memberList, setMemberList, id }: { memberList: QueueMember[] | string, setMemberList: Dispatch<SetStateAction<QueueMember[]>>, id: string }) => {
    const [buttonOption, setButtonOption] = useState<buttonOptionsProps>("Start")
    const queue_action = async (id: string) => {
        const list = memberList as QueueMember[]
        const servingMember = list.find(v => v.status === "serving")
        const updatedObj: responseObj = servingMember ? await completed(servingMember?._id, id) : setButtonOption("Next")

        const result: responseObj = await start_next(id)
        updateArray(updatedObj?.queue_member, result?.queue_member)
        if (result.message == "No waiting users found")
            setButtonOption("Finish")
        console.log("the memberhList updated")
        console.log(memberList)
    }
    const updateArray = (prev?: QueueMember, next?: QueueMember) => {
        const list = memberList as QueueMember[]
        if (prev) {
            const prevIndx = list.findIndex(obj => obj._id === prev!._id);
            if (prevIndx !== -1) {
                list[prevIndx] = prev!;
            }
        }
        else if (next) {
            const index = list.findIndex(obj => obj._id === next?._id);
            if (index !== -1) {
                list[index] = next!;
            }
        }
        setMemberList([...list])
    }

    return (
        <DashboardCard title={"attending to queue #" + id}>
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
                        typeof (memberList) === "string" ?
                            <Typography sx={{ textAlign: "center" }}>
                                {memberList}
                            </Typography>
                            :
                            memberList.map((v, i) =>
                                <TimelineItem key={i}>
                                    <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                                    <TimelineOppositeContent>{v.status}</TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot color={v.status == "waiting" ? "primary" : (v.status == "serving" ? "success" : (v.status == "done" ? "grey" : "inherit"))} variant="outlined" />
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent> <span style={{ marginRight: 100, marginLeft: 100 }}>{v.position}</span>{v.user_id}</TimelineContent>
                                </TimelineItem>
                            )
                    }
                </Timeline>
                <Button variant="contained" component={Button} onClick={async () => await queue_action(id)} disableElevation color="primary" sx={{
                    position: "fixed",
                    top: "50%",
                }}
                    disabled={buttonOption == "Finish"}
                    >
                    {buttonOption}
                </Button>
            </>
        </DashboardCard>
    );
};

export default AttendQueue;