import { Button } from "components/ui/Button.tsx";
import { Input } from "components/ui/Input.tsx";

import React from "react";
import { useForgotPasswordMutation } from "services/user";

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = React.useState("");

    const [forgotPassword, { isLoading, isSuccess, error }] = useForgotPasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await forgotPassword({ email });
    };

    return (
        <div className="relative flex flex-col items-center justify-center shadow-[0px_0px_15px_rgba(255,0,0,0.44)] rounded-3xl">
            <div className="absolute inset-0 bg-black opacity-80 z-0 rounded-3xl"/>
            <div className="flex pt-16 pl-14 pr-14 relative z-10">
                <div>
                  <img className="min-w-[201px] min-h-[160px]" src="/assets/Logo.png" alt="logo"/>
                </div>
                <div className="font-raleway text-48px font-extrabold leading-[56.35px] text-left mt-auto mb-auto pl-6">
                  <span className="text-loginTextColor1">MUSIC</span><span className="text-loginTextColor2">FLOW</span>
                </div>
            </div>
            <div className="relative z-10 w-[448px]">
              <h3 className="font-montserrat font-semibold text-white text-4xl my-[50px]">Change password</h3>
              <span className="font-roboto font-normal text-2xl text-white">
                {isSuccess ? "The email was sent to " + email
                : "Enter the email address linked to your MusicFlow account and we'll send you an email."}
              </span>
              <form className="flex flex-col w-full mt-[25px] pb-[120px]" onSubmit={handleSubmit}>
                <div className="mt-4">
                  <Input
                    className="bg-loginEditTextBg text-white focus:border-none rounded-lg focus:ring-0 border-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <a className="text-loginTextColor2 text-[16px] pt-2" href="">Need help?</a>
                <div className="flex justify-center">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    variant="primary"
                    className="bg-loginTextColor2 w-60 h-14 rounded-full mt-6 text-[24px] font-roboto text-2xl font-normal hover:bg-transparent"
                    >
                      Get the link
                  </Button>
                </div>
              </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;