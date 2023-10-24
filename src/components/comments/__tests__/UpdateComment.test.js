import { render, screen, fireEvent } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import UpdateComment from "../UpdateComment";
import userFixtures from "../../../helpers/fixtures/user";
import commentFixtures from "../../../helpers/fixtures/comment";
import { faker } from "@faker-js/faker";


const userData = userFixtures()
const commentData = commentFixtures(true, false, userData)


test("render the update comment component", async () => {
    const user = userEvent.setup()
    render ( <UpdateComment comment={commentData}/>)

    const showModalForm = screen.getByTestId('show-modal-form')
    expect(showModalForm).toBeInTheDocument()

    fireEvent.click(showModalForm)

    const updateCommentElement = screen.getByTestId('update-comment-form')
    expect(updateCommentElement).toBeInTheDocument()

    const commentBodyField = screen.getByTestId('comment-body-field')
    expect(commentBodyField).toBeInTheDocument()

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeInTheDocument()

    const commentBody = faker.lorem.sentence(10)

    await user.type(commentBodyField, commentBody)

    expect(commentBodyField.value).toBe(commentData.body + commentBody)
    expect(submitButton.disabled).toBeFalsy()
})