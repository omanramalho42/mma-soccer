import { signOut } from "next-auth/react"
import { useEffect } from "react"
import axios from 'axios'
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Header from "@/components/Header"
import { GetServerSideProps } from "next"
import { toast } from "react-toastify"
import { getError } from "@/utils/getError"
import Link from "next/link"
// import bgFernando from "../assets/fernando.png"


export const getServerSideProps:GetServerSideProps = async (ctx: any) => {
  let players;
  const data:any = await axios.get("http://localhost:3000/api/players")
    .then((res) => { 
      console.log(res.data,'response'),
      players = res.data?.data, 
      Promise.resolve(res.data);

      toast.success("Sucesso ao pegar os dados")
    }).catch((error: Error) => {
      console.log(error, 'erro'), 
      Promise.reject(error),
      toast.error(getError(error.message)
    )
  });

  if(data) {
    console.log(data.data,'data');
  } else {
    console.log("erro")
  }
  
  return {
    props: {
      players: players ? players : null,
      message: "success!"
    }
  }
}

export default function Home(props: any) {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect }: any = router.query;

  useEffect(() => {
    if(props) {
      console.log(props,'props get server side rendering');
    } else {
      console.log("props dosent exist");
    }
  },[props])

  useEffect(() => {
    if(!session?.user) {
      router.push(redirect || `/login?redirect=${redirect || "/"}`);    
    } else {
      console.log(session,'session');
    }
  },[redirect, router, session])

  return (
   <main className="">
    <Header />

    <div className="flex-1 flex-col justify-center items-center flex bg-[url('../assets/bg.jpeg')] bg-no-repeat bg-cover h-[100vh] w-[100%]">
      <div className="flex top-28 font-bold bg-transparent ufc__font tracking-widest flex-col space-y-12 flex-1 justify-center items-center">
        <h1 className="text-8xl uppercase font-extrabold text-yellow-500 text-center">
          MMA SOCCER
        </h1>
        <h2 className="text-6xl text-green-500">
          FERNANDO X CLEITON
        </h2>
        <h4 className="tracking-wide text-white">
          SEGUNDA E QUINTA DAS 19 AS 21 HORAS HORARIO DE BRASILIA
        </h4>
        <div className="flex flex-row space-x-12">
          <button className="p-6 shadow-lg rounded-md hover:scale-110 transition-all bg-gray-100 text-center text-lg text-black">
            CARD COMPLETO
          </button>
          <button className="p-6 shadow-lg rounded-md hover:scale-110 transition-all bg-gray-100 text-center text-lg text-black"> 
            SEJA UM MENSALISTA
          </button>
        </div>
        <h5 className="text-white">
          Assita a todos os eventos
        </h5>
      </div>

    </div>

    <div className="flex container justify-center mx-auto flex-col my-24">
      <p className="text-center font-bold ufc_font">
        MMA MEMBROS
      </p>
      <div className="flex space-y-6 flex-col mt-10 mx-10 max-w-8xl ">
        {props?.players?.map((i: any) => (
          <div className="flex-1 bg-white border-2 border-gray-100 rounded-md items-center shadow-xl p-4 flex justify-around">
            <div className="flex flex-col space-y-4 ufc__font">
              <span>{i?.fullName || ""}</span>
              <span>nome</span>
            </div>
            <Link href={`/player/${i._id}`}>
              <img src="http://github.com/omanramalho42.png" className="h-28 w-28 rounded-full shadow-md" width={52}></img>
            </Link>
            <div className="flex flex-col space-y-2 items-start ufc__font">
              <p><strong>Nome: </strong>{ i.fullName }</p>
              <p>Apelido</p>
              <strong>Ultimo jogo: </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
   </main>
  )
}
