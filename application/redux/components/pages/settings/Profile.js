const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const InputDropDown = require('../../InputDropDown')
const InputCheckbox = require('../../InputCheckbox')
const InputLabel = require('../../InputLabel')
const InputTextarea = require('../../InputTextarea')
const InputTextField = require('../../InputTextField')
const React = require('react')
const Sidebar = require('./Sidebar')

const Profile = (p) => (
    <div className="page">
        <AccountHeader />
        <section>
            <div className="container">
                <div className="row">
                    <div className="settings-container">
                        <Sidebar activePage="profile" />
                        <div className="account-content">
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="username"
                            >
                                <InputLabel>
                                    Username (required)
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="email"
                            >
                                <InputLabel>
                                    Email Address (required)
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="displayName"
                            >
                                <InputLabel>
                                    Display Name (required)
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="firstName"
                            >
                                <InputLabel>
                                    First Name
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="lastName"
                            >
                                <InputLabel>
                                    Last Name
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="website"
                            >
                                <InputLabel>
                                    Website
                                </InputLabel>
                            </InputTextField>
                            <InputTextarea
                                onChange={p.onChangeTextField}
                                name="bio"
                            >
                                <InputLabel>
                                    Bio
                                </InputLabel>
                            </InputTextarea>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AccountFooter />
    </div>
)

module.exports = Profile