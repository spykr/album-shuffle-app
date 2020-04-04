import React, { useState } from "react";
import pMinDelay from "p-min-delay";

import Styled from "./LoginModal.styles";
import { Loader } from "@/components/ui";
import { register } from "@/services/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

enum FormState {
  None = 0,
  Submitting = 1,
  Success = 2,
  Failure = 3,
}

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>(FormState.None);

  const submit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setFormState(FormState.Submitting);
    pMinDelay(register(email), 500)
      .then(() => {
        setFormState(FormState.Success);
      })
      .catch(() => {
        setFormState(FormState.Failure);
      });
  };

  return (
    <Styled.Modal open={open}>
      <Styled.Dialog>
        <Styled.Header>
          <Styled.Title>Log in</Styled.Title>
          <Styled.CloseButton type="button" onClick={onClose}>
            <i className="fas fa-times" />
          </Styled.CloseButton>
        </Styled.Header>
        <Styled.Form onSubmit={submit}>
          {formState === FormState.None && (
            <>
              <Styled.Description>
                Enter your email address and you&apos;ll receive an email with a
                link to log you in to the app.
              </Styled.Description>
              <Styled.InputContainer>
                <Styled.InputIcon className="fas fa-envelope" />
                <Styled.Input
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Styled.InputContainer>
              <Styled.SubmitButton type="submit">Submit</Styled.SubmitButton>
            </>
          )}
          {formState === FormState.Submitting && (
            <Styled.LoaderContainer>
              <Loader backgroundColor="none" />
            </Styled.LoaderContainer>
          )}
          {formState === FormState.Success && (
            <Styled.Description>
              The email was successfully sent, please check your inbox.
            </Styled.Description>
          )}
          {formState === FormState.Failure && (
            <Styled.Description>
              There was an error sending the email,
              <br />
              please try again.
              <Styled.SubmitButton
                type="button"
                onClick={() => {
                  setFormState(FormState.None);
                }}
              >
                Try again
              </Styled.SubmitButton>
            </Styled.Description>
          )}
        </Styled.Form>
      </Styled.Dialog>
    </Styled.Modal>
  );
};

export default LoginModal;
