import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useGetLocationsQuery, useDeleteLocationMutation } from '../../slices/locationSlice';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';

const LocationListScreen = () => {
  
    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetLocationsQuery({ pageNumber });

    const [deleteLocation, { isLoading: loadingDelete }] = useDeleteLocationMutation();
    
    const deleteHandler = async (id) => {
        if (window.confirm('Delete item?')) {
            try {
                await deleteLocation(id);
                toast.success('Location Deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            
        }
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Locations</h1>
            </Col>
            <Col className='text-end'>
                <LinkContainer to={`/admin/locations/create`}>
                    <Button className='btn-sm m-3'>
                        <FaEdit /> Create location
                    </Button>
                </LinkContainer>
            </Col>
        </Row>
        { loadingDelete && <Loader /> }

        { isLoading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : (
            <>
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((loc) => (
                            <tr key={loc._id}>
                                <td>{loc._id}</td>
                                <td>{loc.name}</td>
                                <td>
                                    <LinkContainer to={`/admin/location/edit/${loc._id}`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>

                                    <Button variant='danger' className='btn-sm' style={{ color: 'white' }} onClick={ () => deleteHandler(loc._id) }>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
            </>
        ) }
    </>
  )
}

export default LocationListScreen