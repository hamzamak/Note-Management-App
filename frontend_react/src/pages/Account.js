import React, { useEffect, useState } from 'react'
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PageTitle from '../components/PageTitle';
import { Grid } from '@mui/material';
import Profil from '../components/Profil';
import UpdateProfil from '../components/UpdateProfil';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER } from '../constants/utilConstants';
import secureLocalStorage from 'react-secure-storage';
import { updateCompte } from '../actions/compte';
import Swal from 'sweetalert2';

function Account() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState(secureLocalStorage.getItem(USER))
   //  console.log(user)
    const initialState = { userName: user?.userName, login: user?.login, password: '', repassword: '', image: user?.image };
    const [formData, setFormData] = useState(initialState)
    const [errorLogin, setErrorLogin] = useState("")
    const [errorUserName, setErrorUserName] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [error_rePassword, setError_rePassword] = useState("")
    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(formData)
        //console.log(formData)
        if (formData.userName.length === 0) { setErrorUserName("userName doit etre mentione"); }
        else if (formData.userName.length < 4) { setErrorUserName("userName doit avoir au moins 4 characteres"); }

        else if (formData.login.length === 0) { setErrorLogin("login doit etre mentione"); }
        else if (formData.login.length < 4) { setErrorLogin("login doit avoir au moins 4 characteres"); }

        else if (formData.password.length === 0) { setErrorPassword("password doit etre mentione"); }
        else if (formData.password.length < 4) { setErrorPassword("password doit avoir au moins 4 characteres"); }

        else if (formData.repassword.length === 0) { setError_rePassword("repassword doit etre mentione"); }
        else if (formData.password !== formData.repassword) { setError_rePassword("password et repassword sont differents"); }
        else {
            Swal.fire({
                title: `Vous voulez vraiment modifier votre profil ?`,
                icon: 'warning',
                confirmButtonText: 'Oui , Continuer!',
                cancelButtonText: 'Non!',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(updateCompte({
                        id: user?.id,
                        userName: formData.userName,
                        login: formData.login,
                        password: formData.password,
                        image: formData.image
                    }))
                    // setUser({
                    //     ...user, id: user?.id,
                    //     userName: formData.userName,
                    //     login: formData.login,
                    //     password: formData.password,
                    //     image: formData.image
                    // })

                    setErrorPassword("")
                    setErrorLogin("")
                    setError_rePassword("")

                }
            })
        }




    };

    useEffect(() => {
        if (!user) navigate('/')
    }, [navigate, user])

    return (
        <div style={{ maxWidth: "90%", margin: "auto" }}  >
            <PageTitle title="Account" icon={<LockPersonIcon fontSize='medium' />} iconBackgroundColor="linear-gradient(90deg,#da8cff,#9a55ff)" />

            <Grid container spacing={5} >
                <Grid item xs={12} md={6} lg={4}  >
                    <Profil user_image={user?.image} user_name={user?.userName} formData={formData} handleChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6} lg={8}  >
                    <UpdateProfil handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} errorPassword={errorPassword}
                        errorLogin={errorLogin}
                        error_rePassword={error_rePassword} errorUserName={errorUserName}
                    />
                </Grid>

            </Grid>

        </div>
    )
}

export default Account