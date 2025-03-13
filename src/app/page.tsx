/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { generateFlow } from "./services/genkit";
import Image from "next/image";
import AvatarImg from "../../public/avatar.png";
import CircleBullet from "./motion/CircleBullet";

interface AvatarProps {
  status?: string;
}

const Avatar: React.FC<AvatarProps> = ({ status }) => {
  return (
    <div className="flex flex-row gap-2">
      <Image src={AvatarImg} width={50} height={50} alt="Avatar Images" />
      <p className="text-lg mt-2 font-bold">{status}</p>
    </div>
  );
};

const Home = () => {
  const [result, setResult] = useState<{
    judge: string;
    solution: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getResult = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const url = formData.get("url")?.toString() ?? "";
      if (!url) {
        setError("URL tidak boleh kosong!");
        return;
      }
      const suggest = await generateFlow(url);
      setResult(suggest);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-around xl:flex-col items-center h-[100vh] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 sm:flex-col max-[640px]:flex-col z-10 overflow-clip">
        <CircleBullet />
        <span
          content=""
          className="w-52 blur-3xl h-52 absolute left-0 top-0 -z-[0] bg-amber-500 rounded-full"
        ></span>
        <div className="flex flex-col gap-2 mb-32 w-full z-10">
          <article className="h-auto xl:w-[750px] max-[640px]:w-[90%] max-[640px]:self-center sm:w-[90%] sm:self-center bg-white/50 border-2 border-white px-8 py-8 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl max-[900px]:overflow-y-scroll max-[900px]:max-h-[600px] max-[900px]:w-[85%]">
            <h1 className="text-3xl font-bold text-black underline underline-offset-4 decoration-amber-400 max-[900px]:text-2xl">
              Siapkan Mental Kalian!
            </h1>
            <div className="text-lg mt-2">
              {loading ? (
                <Avatar status="Sedang mengetik..." />
              ) : result ? (
                <div className="flex flex-col gap-2">
                  <Avatar status="Ini kritik buat instagram Lo 😭" />
                  <p className="bg-white px-4 py-4 rounded-xl font-medium">
                    {result.judge}
                  </p>
                </div>
              ) : (
                <Avatar status="Halo, semua 👋" />
              )}
            </div>
          </article>
        </div>
        <form
          className="flex flex-col absolute z-50 bottom-4 xl:w-[40%] max-[900px]:w-[85%]"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await getResult(formData);
          }}
        >
          <p className="text-xl font-bold">#janganbaperkawand</p>
          <label
            htmlFor="url"
            className="text-5xl font-bold text-white max-[640px]:text-3xl mb-2"
          >
            Username Instagram
          </label>
          <div className="text-xl flex border-2 justify-center items-center border-white outline-none text-white bg-white/20 placeholder-white rounded-xl px-4 py-2">
            <input
              type="text"
              name="url"
              id="url"
              className="w-full px-8 py-2 outline-none"
              required
              placeholder="Ketikkan Username Instagram"
            />
            <button
              type="submit"
              className="bg-black cursor-pointer active:scale-95 text-4xl text-white font-bold px-5 py-2 rounded-full hover:bg-black transition-all duration-300 max-[640px]:text-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={20}
              >
                <path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path>
              </svg>
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default Home;
