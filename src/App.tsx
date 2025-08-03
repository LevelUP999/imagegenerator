import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import { Button } from "./components/ui/button"
import { Card, CardHeader, CardFooter, CardContent } from "./components/ui/card"
import { Textarea } from "./components/ui/textarea"
import { Paintbrush } from "lucide-react";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

function App() {

  const [CurrentIMG, setCurrentIMG] = useState("https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg");
  const [CurrentPrompt, setCurrentPrompt] = useState("Nada ainda");
  const [Loading, setLoading] = useState(false);
  const [CurrentStyle, setCurrentStyle] = useState("")

  useEffect(() => {
    const load = document.getElementById("loading")

    if (Loading && load) {
      load.classList = "flex min-w-[70px] min-h-[70px]"
    } else if (load){
      load.classList = "flex min-w-[70px] min-h-[70px] hidden"
    }
  }, [Loading])

  const callIMG = (prompt: string) => {
    fetch(`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}%20.%20In%20Style:%20${CurrentStyle}`).then(res => res).then(data => {setCurrentIMG(data.url); setCurrentPrompt(prompt); setLoading(false)});
  }

  return (
    <div className="flex p-6 bg-[#000] h-screen">
      <Card className="bg-[#1a1a1a] m-auto w-full h-full p-3 text-white">
        <CardHeader className="border-b-2 border-[#6a6a6a] flex flex-col items-center gap-2 p-3">
          <h1 className="text-[#ff0004] font-bold text-3xl">Gerar sua Imagem</h1>
          <p className="text-[#00ff8c] font-bold text-1xl">- Gere sua imagem -</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center border-b-2 border-[#6a6a6a] p-3">
          <form className="flex flex-col items-center w-full gap-3" onSubmit={(e) => {
            e.preventDefault();
            if(document.getElementById("userprompt")){
              const prompt = document.getElementById("userprompt") as HTMLTextAreaElement;
              if (prompt.value == "") {
                toast("Escreva algo!");
              } else {
                callIMG(prompt.value)
                toast("Criando sua imagem!");
                setLoading(true);
              }
            }
          }}>
            <h2 className="font-bold text-2xl text-[#00ff8c]">Prompt:</h2>
            <Textarea id="userprompt" className="text-center" placeholder="Uma maga poderossa soltandoumfeitiço vermelho..." required></Textarea>
            <Select required onValueChange={(style) => setCurrentStyle(style)}>
              <SelectTrigger>
                <SelectValue placeholder="Qual oestilo da imagem?" ></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estilo:</SelectLabel>
                  <SelectItem value="Anime">Anime</SelectItem>
                  <SelectItem value="realista">Realista</SelectItem>
                  <SelectItem value="anime">Nenhum</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant={"outline"} >
              <Paintbrush></Paintbrush>
              <p>Gerar</p>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-9">
          <Card className="flex items-center flex-col p-3 min-w-[300px] min-h-[300px] rounded-2xl bg-[#ff000430]" >
            <img src={CurrentIMG} id="img" className="m-auto w-full h-full rounded-2xl" />
            <p className="self-center font-bold text-[#6a6a6a]" >"{CurrentPrompt}"</p>
          </Card>
          <div id="loading" className="min-w-[70px] min-h-[70px] hidden">
            <div className="w-full h-full border-t-[#ff0004] border-10 rounded-full animate-spin"></div>
          </div>
        </CardFooter>
      </Card>
      <Toaster></Toaster>
    </div>
  )
}

export default App
