import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useCreateWasteMutation,
  useUploadWasteImageMutation,
} from "../../slices/wasteSlice";
import { toast } from "react-toastify";
import { Form, Button, FormGroup } from "react-bootstrap";
import styles from "../styles/UserEdit.module.css";
import FormContainer from "../../components/FormContainer";
import Header from "../../components/Header";

const WasteCreateScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);

  const navigate = useNavigate();

  const [uploadWasteImage, { isLoading: loadingUpload }] =
    useUploadWasteImageMutation();
  const [createWaste, { isLoading: loadingCreate, error }] =
    useCreateWasteMutation();

  useEffect(() => {
    setName(name);
    setImage(image);
  });

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    if (e.target.files.length > 0) {
      formData.append("image", e.target.files[0]);
    }

    try {
      const res = await uploadWasteImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const newWaste = {
      name,
      image,
    };

    const result = await createWaste(newWaste);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Waste Created");
      navigate("/admin/wastes");
    }
  };

  return (
    <>
      <main className={styles.useredit_container2}>
        <Header />
        <div className={styles.useredit_container}>
          <div className={styles.form}>
            <div className={styles.userlist_title}>
              <h4>Create Waste</h4>
            </div>
            <FormContainer>
              {loadingCreate && <Loader />}

              {loadingCreate ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <FormGroup controlId="name" className={styles.row}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </FormGroup>

                  <FormGroup controlId="image" className={styles.row}>
                    <Form.Label>Images</Form.Label>
                    <Form.Control
                      type="file"
                      label="Choose files"
                      onChange={uploadFileHandler}
                    />
                  </FormGroup>
                  {loadingUpload && <Loader />}
                  <Link
                    to={`/admin/wastes`}
                    style={{ marginRight: "10px" }}
                    className="btn btn-danger my-3"
                  >
                    Cancel
                  </Link>
                  <Button type="submit" variant="primary" className="btn my-3">
                    Create
                  </Button>
                </Form>
              )}
            </FormContainer>
          </div>
        </div>
      </main>
    </>
  );
};

export default WasteCreateScreen;
