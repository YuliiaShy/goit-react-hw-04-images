import  { useState, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import {Container} from 'App.styled';
import api from "api/API";


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [total, setTotal] = useState(null);
  const [largeImage, setLargeImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
setStatus('pending');
const getImages= async (searchQuery, page) => {
      try {
        const { totalHits, hits } = await api.fetchImages(searchQuery, page);

         if (hits.length === 0) {
        setStatus('idle');
        toast.error(`Not found: ${searchQuery} `);
        return
      }

        if (page === 1 )
        toast.success(`We found ${totalHits} images`);

        setImages(images => [...images, ...hits]);
        setTotal(totalHits);
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      } 
    };
    getImages(searchQuery, page);
    scroll.scrollToBottom();
  }, [searchQuery, page]);

  useEffect(() => {
    if (total === images.length) {
      toast.warn(`You've reached the end of search results`);
    }
  }, [total, images.length]);

  const handleSubmitInput = value => {
    setSearchQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setTotal(null);
  };

  const handleLoadMoreButtonClick  = () => {
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onClickImage = (event) => {
    toggleModal();
    setLargeImage(event)
  }

    return (
      <Container> 
        <Searchbar onSubmit={handleSubmitInput} />
        {status === 'pending' && (<Loader /> )} 
        {status === 'resolved' && (<ImageGallery images={images} onClick={onClickImage} />)}
        {showModal && (<Modal onClose={toggleModal}>
          <img src={largeImage} alt={''}/>
        </Modal>)}
        {status !== 'pending' && images.length > 0 && images.length < total && (
          <Button onClick={handleLoadMoreButtonClick} /> )}
        <ToastContainer autoClose={2000} />
      </Container>
    );
}

export default App;
