const AccountFooter = require('../../AccountFooter')
const AccountHeader = require('../../AccountHeader')
const InputDropDown = require('../../InputDropDown')
const InputCheckbox = require('../../InputCheckbox')
const InputLabel = require('../../InputLabel')
const InputTextField = require('../../InputTextField')
const React = require('react')
const Sidebar = require('./Sidebar')

const Address = (p) => (
    <div className="page">
        <AccountHeader />
        <section>
            <div className="container">
                <div className="row">
                    <div className="settings-container">
                        <Sidebar activePage="address" />
                        <div className="account-content">
                            <div className="account-heading">
                                Delivery Address
                            </div>
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
                                name="email"
                            >
                                <InputLabel>
                                    Email Address
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="streetAddress"
                            >
                                <InputLabel>
                                    Street Address
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="streetAddress2"
                            >
                                <InputLabel>
                                    Street Address 2
                                </InputLabel>
                            </InputTextField>
                            <InputDropDown
                                onChange={p.onChangeTextField}
                                options={[]}
                                name="country"
                            >
                                <InputLabel>
                                    Country
                                </InputLabel>
                            </InputDropDown>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="state"
                            >
                                <InputLabel>
                                    State / Province
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="region"
                            >
                                <InputLabel>
                                    City / Town
                                </InputLabel>
                            </InputTextField>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="postalCode"
                            >
                                <InputLabel>
                                    Zip / Postcode
                                </InputLabel>
                            </InputTextField>
                            <InputCheckbox>
                                <InputLabel>
                                    I don't have a postcode
                                </InputLabel>
                            </InputCheckbox>
                            <InputTextField
                                onChange={p.onChangeTextField}
                                name="phone"
                            >
                                <InputLabel>
                                    Mobile Phone Number
                                </InputLabel>
                            </InputTextField>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <AccountFooter />
    </div>
)

module.exports = Address