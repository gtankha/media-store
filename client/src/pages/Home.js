import React, { useEffect } from "react";
import Body from '../components/Body';
import { useDispatch } from 'react-redux';
const clientId = '900972042486-ho4224klutu5ot121jh6nao4d2tnfp8q.apps.googleusercontent.com';
let prevUpdate = null;

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const evtSource = new EventSource('/events');
    const evtSource2 = new EventSource('/events');

    evtSource2.addEventListener('UPDATE_MESSAGES', function (evt) {


      const data = JSON.parse(evt.data);
      const type = evt.type;


      dispatch({
        type: type,
        messages: data.messages.reverse()
      });

    })

    evtSource.addEventListener('UPDATE_PRODUCTS', function (evt) {

      const data = JSON.parse(evt.data);
      const type = evt.type;

      if (!prevUpdate) {
        prevUpdate = data;
      }
      else if (isSameObject(data)) {
        return;
      }

      prevUpdate = data;

      dispatch({
        type: type,
        products: data
      });

    }, false);

  }, [dispatch])

  const isSameObject = function (_data) {

    if (_data.length != prevUpdate.length) return false;

    for (let i = 0; i < _data.length; i++) {
      for (let n in _data[i]) {

        if (_data[i][n] != prevUpdate[i][n]) return false;


      }

    }

    return true;

  }

  return (


    <Body />



    //  </div>
  );
};

export default Home;
