import { useState, useEffect } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useCreateLocationMutation, useUploadLocationImageMutation } from '../../slices/locationSlice';
import { toast } from 'react-toastify';
import { Form,Button, FormGroup, FormControl } from 'react-bootstrap';
import FormContainer from "../../components/FormContainer";

const LocationCreateScreen = () => {
  
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    
    const navigate = useNavigate();

    const [uploadLocationImage, { isLoading: loadingUpload }] = useUploadLocationImageMutation();
    const [createLocation, { isLoading: loadingCreate, error }] = useCreateLocationMutation();

    useEffect(() => { 
            setName(name);
            setImage(image);
    },);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
    
        if (e.target.files.length > 0) {
          formData.append("image", e.target.files[0]);
        }
    
        try {
          const res = await uploadLocationImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image); 
        } catch (err) {
          toast.error(err?.data?.message || err.error);
          console.log(err?.data?.message || err.error);
        }
      };

    const submitHandler = async (e) => {
        e.preventDefault();
      
        const newLocation = {
          name,
          image,
        };
      
        const result = await createLocation(newLocation);
      
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success('Location Created');
          navigate('/');
        }
      };

  return (
    <>
        <FormContainer>
            <h1>Create Location</h1>
            { loadingCreate && <Loader /> }

            { loadingCreate ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : (
                <Form onSubmit={ submitHandler }>
                    <FormGroup controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </FormGroup>

                    <FormGroup controlId="image" className="my-2">
                        <Form.Label>Images</Form.Label>
                        <Form.Control
                            type="file"
                            label="Choose files"
                            onChange={uploadFileHandler}
                        />
                    </FormGroup>
                    { loadingUpload && <Loader /> }
                    
                    <Button
                        type="submit"
                        variant="primary"
                        className="my-2">
                        Create
                    </Button>
                </Form>
            ) }
        </FormContainer>
    </>
  )
}

export default LocationCreateScreen