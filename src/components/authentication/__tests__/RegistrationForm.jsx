import { render,screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import RegistrationForm from "../../Forms/RegistrationForm"
import { faker } from "@faker-js/faker";
import userFixtures from "../../../helpers/fixtures/user";
import Registration from "../../../pages/Registration"


const userData = userFixtures()

test("renders registrtaion form", async()=> {
    const user = userEvent.setup() 
    render ( <RegistrationForm /> )

    const registrationForm = screen.getByTestId('register-form')
    expect(registrationForm).toBeInTheDocument()


    const firstnameField = screen.getByTestId('firstname-field')
    expect(firstnameField).toBeInTheDocument()

    const lastnameField = screen.getByTestId('lastname-field')
    expect(lastnameField).toBeInTheDocument()

    const usernameField = screen.getByTestId('username-field')
    expect(usernameField).toBeInTheDocument()

    const emailField = screen.getByTestId('email-field')
    expect(emailField).toBeInTheDocument()

    const passwordField = screen.getByTestId('password-field')
    expect(passwordField).toBeInTheDocument()

    const bioField = screen.getByTestId('bio-field')
    expect(bioField).toBeInTheDocument()

    const password = faker.lorem.slug(2)
    await user.type(usernameField, userData.username)
    await user.type(firstnameField, userData.first_name)
    await user.type(lastnameField, userData.last_name)
    await user.type(emailField, userData.email)
    await user.type(bioField, userData.bio)
    await user.type(passwordField, password)


    expect(usernameField.value).toBe(userData.username)
    expect(passwordField.value).toBe(password)
    expect(firstnameField.value).toBe(userData.first_name) 
    expect(lastnameField.value).toBe(userData.last_name)
    expect(emailField.value).toBe(userData.email)
    expect(bioField.value).toBe(userData.bio)
})