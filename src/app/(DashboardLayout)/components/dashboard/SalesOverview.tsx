import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import dynamic from "next/dynamic";
import { setMaxListeners } from 'events';
import { Preview } from '@mui/icons-material';
import { overview_analytics } from '@/lib/requests'
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


const SalesOverview = () => {

    const months = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ]
    const [fetched, setFetched] = React.useState( Array<{day: number, people_count: number, revenue: number}>())
    React.useEffect(() => {
        (async function () {
            const dt = await overview_analytics()
            console.log(dt)
            setFetched(dt.data)
        })()
    })
    
    // select
    const [month, setMonth] = React.useState<string>(months[new Date().getMonth()]); //month is being tracked using index from months
    const [year, setYear] = React.useState(new Date().getFullYear())

    const [days, setDays] = React.useState<number[]>(Array.from({length: 31}, (_, i) => i + 1));

    const nofD = new Date(2025, new Date().getMonth() + 1, 0).getDate()

    // col data
    const [colChart, setColChart] = React.useState(
        {
            customers: new Array(nofD).fill(0),
            earnings: new Array(nofD).fill(0)
        }
    )

    React.useEffect(() => {
        //loop through all the days, where there is day with record, update the array
        setColChart(prev => {
            let newColChart = prev;
                for (let j = 0; j < fetched.length; j++) {
                    let k = fetched[j].day
                    newColChart.earnings[k - 1] = fetched[j].revenue
                    newColChart.customers[k - 1] = fetched[j].people_count
                }
            
            return newColChart
        })
    })
    
    const handleChange : any = (e: any) => {
        const selectedMonth = e.target.value
        var n : number;
        switch(selectedMonth) {
            case 'september':
                    case 'april':
                    case 'june':
                    case 'november':
                        n = 30
                        break;
                    case 'february':
                        n = 29
                        break;
                    default:
                        n = 31
                        break;
        }
                    
        const arr = Array.from({length: n}, (_, i) => i + 1)
        setDays(arr)
        setMonth(selectedMonth)
        setColChart({customers: new Array(n).fill(0), earnings: new Array(n).fill(0)})
        console.log(month)
    };

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        //choose this days based on available data
        xaxis: {
            categories: days,
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    const seriescolumnchart: any = [
        {
            name: 'Customers this month',
            data: colChart.customers, //colChart.customers
        },
        {
            name: 'Earnings this month',
            data: colChart.earnings, // colChart.earnings
        },
    ];

    return (

        <DashboardCard title="Activity Overview" action={
            <Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                {
                    months.map((v) => 
                        <MenuItem value={v}>{v.toUpperCase()} {year}</MenuItem>
                    )
                }
            </Select>
        }>
            <Select
                label="year"
                id="year"
                value={year}
                size="small"
                onChange={(e) => setYear(e.target.value)}
            >
                <MenuItem value={"2025"}>2025</MenuItem>
                <MenuItem value={"2026"}>2026</MenuItem>
            </Select>
            <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={370} width={"100%"}
            />
        </DashboardCard>
    );
};

export default SalesOverview;
