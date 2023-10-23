import { fireEvent, render, screen } from '../../../helpers/test-utils'
import userEvent from '@testing-library/user-event'
import CreatePost from "../CreatePost"
import { faker } from "@faker-js/faker"

test("renders CreatePost component", async() => {
    const user = userEvent.setup()
    render( <CreatePost /> )
    
    const showModalForm = screen.getByTestId('show-modal-form')
    expect(showModalForm).toBeInTheDocument()

    fireEvent.click(showModalForm)

    const createFormElement = screen.getByTestId('create-post-form')
    expect(createFormElement).toBeInTheDocument() 

    const postBodyField = screen.getByTestId('post-body-field')
    expect(postBodyField).toBeInTheDocument()

    const submitButton = screen.getByTestId('create-post-submit')
    expect(submitButton).toBeInTheDocument()

    expect(submitButton.disabled).toBeTruthy()

    const postBody = faker.lorem.sentence(10)
    await user.type(postBodyField, postBody)

    //check if field has the text and button is not disabled 
    expect(postBodyField.value).toBe(postBody)
    expect(submitButton.disabled).toBeFalsy()
})