/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { generateFlow } from "./services/genkit";
import Image from "next/image";
import AvatarImg from "../../public/avatar.png";

interface AvatarProps {
  status?: string;
}

const Avatar: React.FC<AvatarProps> = ({ status }) => {
  return (
    <div className="flex flex-row gap-2">
      <Image src={AvatarImg} width={50} height={50} alt="Avatar Images" />
      <p className="text-lg mt-2">{status}</p>
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
    <div className="flex justify-around xl:flex-row items-center h-screen bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 sm:flex-col max-[640px]:flex-col max-[640px]:h-[100vh]">
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await getResult(formData);
        }}
      >
        <p className="text-xl font-bold">#janganbaperkawand</p>
        <label
          htmlFor="url"
          className="text-5xl font-bold text-white max-[640px]:text-4xl"
        >
          Username Instagram
        </label>
        <input
          type="text"
          name="url"
          id="url"
          className="text-xl border-b-2 border-white outline-none text-white bg-transparent placeholder-white"
          required
          placeholder="Ketikkan Username Instagram"
        />
        <button
          type="submit"
          className="bg-amber-300 cursor-pointer active:scale-95 text-4xl text-white font-bold px-5 py-2 rounded-full mt-2 hover:bg-black transition-all duration-300 max-[640px]:text-2xl"
        >
          {loading ? "Loading..." : "Generate"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      <div className="flex flex-col gap-2">
        <article className="h-auto xl:w-[600px] max-[640px]:w-[90%] max-[640px]:self-center sm:w-[90%] sm:self-center bg-white px-8 py-8 rounded-tr-3xl rounded-br-3xl rounded-bl-3xl max-[640px]:overflow-y-scroll max-[640px]:h-[600px]">
          <h1 className="text-3xl font-bold text-black underline underline-offset-4 decoration-amber-400">
            Siapkan Mental Kalian!
          </h1>
          <div className="text-lg mt-2">
            {loading ? (
              <Avatar status="Sedang mengetik..." />
            ) : result ? (
              result.judge
            ) : (
              <Avatar status="Rawr AI" />
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default Home;
