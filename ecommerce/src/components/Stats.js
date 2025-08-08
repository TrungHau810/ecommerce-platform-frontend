import { useEffect, useState } from "react";
import { authApis, endpoints } from "../configs/Apis";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Stats = () => {

    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await authApis().get(endpoints.stats);
            console.log("Fetched stats:", res.data);
            setStats(res.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const data = {
        labels: stats.map((item) => item[1]),
        datasets: [
            {
                label: "Doanh thu",
                data: stats.map((item) => item[2]),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Thống kê tổng doanh thu của cửa hàng",
            },
        },
    };

    return (
        <>
            <h1>Thống kê báo cáo</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Bar data={data} options={options} />
            )}
        </>

    );
}

export default Stats;