import { useEffect, useState } from "react";
import Apis, { authApis, endpoints } from "./configs/Apis";
import { Alert, Button, Image, Table } from "react-bootstrap";


const VerifiedAccount = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState(null);

    const loadUsers = async () => {
        let res = await Apis.get(endpoints['verified-users']);
        console.log("Fetched users:", res.data);
        setUsers(res.data);
    }

    const verifyUser = async (id) => {
        setUpdatingId(id);
        setError(null);
        try {
            let res = await authApis().patch(endpoints['update-verified'](id));
            
            // Cập nhật lại danh sách sau khi xác thực
            setUsers(users.filter(user => user.id !== id));
        } catch (e) {
            setError("Xác thực thất bại. Vui lòng thử lại.");
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (

        <>
            <h1 className="text-center mt-5">Tài khoản chưa xác thực </h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Họ và tên</th>
                        <th>Username</th>
                        <th>Số điện thoại</th>
                        <th>Xác thực</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Không có người dùng nào cần xác thực
                            </td>
                        </tr>
                    )}
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <Image
                                    src={user.avatar}
                                    roundedCircle
                                    width={50}
                                    height={50}
                                    alt="avatar"
                                />
                            </td>
                            <td>{user.fullName}</td>
                            <td>{user.username}</td>
                            <td>{user.numberPhone}</td>

                            <td>
                                <Button
                                    variant="success"
                                    disabled={updatingId === user.id}
                                    onClick={() => verifyUser(user.id)}
                                >
                                    {updatingId === user.id ? "Đang xử lý..." : "Xác thực"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

export default VerifiedAccount;