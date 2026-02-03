import * as React from 'react'
// import {QRCodeSVG} from 'qrcode.react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem } from '@mui/material';
import Link from "next/link"
import { delete_queue } from "@/lib/requests"
import { useRouter } from "next/navigation"
import { QRCodeSVG } from 'qrcode.react';

export default function QueueCard(props: any) {
    const theme = useTheme();
    const router = useRouter();
    const svgRef = React.useRef<any | null>(null)
    const cardAct = [
        {
            tag: "delete",
            handleClick: async () => {
                const result = await delete_queue(props.q._id)
                router.push("/queues")
            }
        },
        {
            tag: "qr code",
            handleClick: async () => {
                handleClickOpen(props.q._id)
            }
        }
    ]
     const [open, setOpen] = React.useState();
    
      const handleClickOpen = (id : any) => {
        setOpen(id);
      };
    
      const handleClose = () => {
        setOpen(undefined);
      };

      const handleDownload = React.useCallback(() => {
        const svgElement = svgRef.current?.querySelector("svg")

        if (!svgElement)
            window.alert("SVG element not found")

        const svgXML = new XMLSerializer().serializeToString(svgElement)

        const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgXML)

        const anchor = document.createElement("a")
        anchor.href = dataUrl
        anchor.download = `${props.queue_name || "qrcode"}.svg`
        document.body.appendChild(anchor)
        anchor.click()
        document.body.removeChild(anchor)

      }, [props.q._id])
      

    return (
        <Card sx={{ display: 'flex', width: '60%', justifyContent: 'space-between' }}>
            <Link href={'/queues/attend/' + props.q._id}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {props.q.queue_name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary' }}
                        >
                            #{props.q._id}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{ color: 'text.secondary', fontSize: 12, marginTop: 2 }}
                        >
                            Created:{props.q.created_at}
                        </Typography>
                    </CardContent>
                </Box>
            </Link>
                <Dialog
                        open={props.q._id === open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Download QR code to print"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                {props.q.queue_name}
                            </DialogContentText>
                            <div ref={svgRef}>
                            <QRCodeSVG
                            value={`http://localhost:3000/join?queue_id=${props.q._id}&admin_id=${props.q.admin_id}`}
                            size={400}
                            />
                            </div>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Close</Button>
                          <Button onClick={handleDownload} autoFocus>
                            Download
                          </Button>
                        </DialogActions>
                      </Dialog>
            <Select sx={{ height: 15, width: 20 }}>
                {cardAct.map((v, i) =>
                    <MenuItem key={i} onClick={v.handleClick}>
                        {v.tag}
                    </MenuItem>
                )}
            </Select>
        </Card>
    );
}
// JOT:
// we need to generate a qr code for each page carrying parameters for the api request
// we need a single web page, 
// connected to the join, api endpoint, 
// it should by pass authentication
// and should return the users, position