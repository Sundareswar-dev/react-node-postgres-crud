import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser, updateUser } from "../api/userApi";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState("");
  const [profile, setProfile] = useState("");
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [validationError, setValidationError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("check")
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate("/")
  }

  const handleEditModal = (id) => {
    setIsModalOpen("edit");
    users.forEach((data) => {
      if (data.id == id) {
        setEditId(data.id);
        setName(data.name);
        setRole(data.role);
        setEmail(data.email);
        setProfile(data.profile);
        setAddress(data.address);
      }
    });
  };

  const handleEdit = async () => {
    if (!address || !profile || !email || !role || !name) {
      setValidationError(true);
    } else {
      await updateUser(editId, {
        name: name,
        email: email,
        role: role,
        address: address,
        profile: profile,
      });
      await fetchUsers();
      setIsModalOpen(false);
      setValidationError(false);
    }
  };

  const handleDeleteModal = (id) => {
    setIsModalOpen("delete");
    setDeleteId(id);
  };

  const handleDelete = async () => {
    await deleteUser(deleteId);
    setDeleteId("");
    fetchUsers();
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        User's Lists
        <div>
          <Button type="primary" style={{marginTop:15}} onClick={handleLogout}>Log Out</Button>
        </div>
      </h2>
      <Row justify="space-between">
        <Col>
          <Button type="primary" onClick={() => navigate("/")}>
            Back
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={() => navigate("/adduser")}>
            Add User
          </Button>
        </Col>
      </Row>

      <Row gutter={40}>
        {users.map((data, index) => {
          return (
            <Col span={6} key={index}>
              <Card
                title={<h3>{data.name}</h3>}
                style={{
                  textAlign: "center",
                  margin: 15,
                }}
                className="custom-userlist-panel"
                cover={<img alt={data.name} src={data.profile} />}
              >
                <Card.Meta
                  description={
                    <>
                      <p>{data.role}</p>
                      <p>{data.address}</p>
                    </>
                  }
                />
                <Row justify="space-between">
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => handleEditModal(data.id)}
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      onClick={() => handleDeleteModal(data.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        open={isModalOpen == "delete" ? true : false}
        footer={[
          <Button onClick={() => setIsModalOpen(false)}>cancel</Button>,
          <Button type="primary" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        Are you sure, you want to delete this item?
      </Modal>

      <Modal
        className="editModal"
        style={{ marginTop: "10px" }}
        title={<h3 style={{ textAlign: "center" }}>Update User</h3>}
        open={isModalOpen == "edit" ? true : false}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button onClick={() => setIsModalOpen(false)}>cancel</Button>,
          <Button type="primary" onClick={handleEdit}>
            Update
          </Button>,
        ]}
      >
        <Card>
          <h4>Name</h4>
          <Input
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          {validationError && !name && (
            <div style={{ color: "red" }}>Please enter Name</div>
          )}

          <h4>Email</h4>
          <Input
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {validationError && !email && (
            <div style={{ color: "red" }}>Please enter email</div>
          )}

          <h4>Profile Image</h4>
          <Input
            defaultValue={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
          {validationError && !profile && (
            <div style={{ color: "red" }}>Please enter profile</div>
          )}

          <h4>Position</h4>
          <Input
            defaultValue={role}
            onChange={(e) => setRole(e.target.value)}
          />
          {validationError && !role && (
            <div style={{ color: "red" }}>Please enter role</div>
          )}

          <h4>Location</h4>
          <Input
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {validationError && !address && (
            <div style={{ color: "red" }}>Please enter address</div>
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default UserList;
