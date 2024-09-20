import { FC } from "react";
import mainvisual from '../assets/images/tmp/mainvisual.jpg'

const About : FC = () => {
    return (
        <div>
            <div className="flex justify-center mt-8 ">          
                <img src={mainvisual} alt="メインビジュアル" style={{ width: '300px', marginBottom: '20px' }}  />
            </div>
            <body className="font-body">
                <div className="flex flex-wrap justify-center ml-10 mr-10">
                    <div>
                        <h1 className="text-center mb-6">テーマ「編む」</h1>
                        <p>学生一人一人の今まで培ってきた力、今まで歩いてきた道を一本の「糸」と捉え、一人一人の意図を織り交ぜながら、みんなで大学祭を作り上げていく。</p>           
                    </div>
                </div>           
            </body>
  
 
        </div>
    );
}

export default About;