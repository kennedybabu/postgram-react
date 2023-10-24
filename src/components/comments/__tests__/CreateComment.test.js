import { render, screen } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import CreateComment from "../CreateComment"
import { faker } from "@faker-js/faker"


test("renders the createComment component", async () => {
    const user = userEvent.setup()
    render ( < CreateComment /> )

    const createCommentElement = screen.getByTestId('create-comment-form')
    expect(createCommentElement).toBeInTheDocument()

    const commentBodyField = screen.getByTestId('comment-body-field')
    expect(commentBodyField).toBeInTheDocument()

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeInTheDocument()

    expect(submitButton.disabled).toBeTruthy()

    const commentBody = faker.lorem.sentence(10)

    await user.type(commentBodyField, commentBody)

    expect(commentBodyField.value).toBe(commentBody)
    expect(submitButton.disabled).toBeFalsy()

})