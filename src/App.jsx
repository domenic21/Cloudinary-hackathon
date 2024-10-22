import './App.css'
import UploadWidget from './components/UploadWidget'
import { useState } from 'react'
import {Cloudinary} from "@cloudinary/url-gen";
import { Card, CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useEffect } from 'react';
import { SpinnerCircular } from 'spinners-react';
// Import required actions.

import {  generativeReplace } from "@cloudinary/url-gen/actions/effect";

function App() {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'domcloud',
    },
  });

  const [imageUrl, setImageUrl] = useState('');
  const [publicid, setPublicId] = useState('');
  const [myUrl, setMyUrl] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleUpload = (url) => {
    setImageUrl(url);
    console.log(url);
  };

  const handlePublicId = (publicId) => {
    console.log(publicId + 'publicId');
    setPublicId(publicId);
  };

  useEffect(() => {
    if (publicid) {
      // Instantiate a CloudinaryImage object for the image with public ID.
      const myImage = cld.image(publicid);
      // Resize the image.
      myImage.effect(generativeReplace().from("the clothing").to(selectedTopic).preserveGeometry())
      
      .setVersion(1688737277);

      // Get the URL.
      const url = myImage.toURL();
      setMyUrl(url);
      console.log(url);
        }
        }, [publicid, selectedTopic]); // Add publicid and selectedTopic as dependencies to the useEffect hook to re-run the effect when either of them changes.

        const handleTopicSelection = (topic) => {
        setSelectedTopic(topic);
        }

        const handleDownload = () => {
          const link = document.createElement('a');
          link.href = myUrl;
          link.download = 'transformed_image.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

  return (
    <>
      <div className="root min-h-screen bg-black flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl 
        bg-gray-800 rounded-2xl shadow-xl p-4
        bg-opacity-80">
          <Card className="bg-gray-900 shadow-xl border rounded-xl border-purple-700">
            <CardContent className="p-6">
              <h1 className="text-4xl font-creepster text-center mb-6 text-purple-500 tracking-wider">Halloween Costume Transformer</h1>
              <div className="space-y-4">
                <UploadWidget onUploadSuccess={handleUpload} setpublicId={handlePublicId} />
                {myUrl && (
                <button
                  onClick={handleDownload}
                  className=" font-creepster text-center mb-6tracking-wider bg-purple-700
                   text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500
                    focus:ring-opacity-50 font-creepster text-xl"
                >
                  Download Image
                </button>
              )}
                <div className="relative max-w-full object-contain h-[30rem] bg-gray-800 rounded-lg overflow-hidden border-2 border-purple-500">
                  {myUrl && selectedTopic !== null ? (
                    <div className="mt-2 flex justify-center">
                      <img
                        src={myUrl}
                        alt="uploaded please select a costume"
                        className="max-h-[30rem] max-w-full object-contain text-white font-medium "
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-purple-300 font-creepster text-2xl">
                      No spooky image yet...
                    </div>
                  )}
                  {!myUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <SpinnerCircular size={50} thickness={100} speed={100} color="#ffffff" />
                    </div>
                  )}
                   
               
              
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-col justify-center gap-14">
            <p className='text-white flex justify-center font-creepster font-semibold text-[3rem]'>Select Costume</p>
            <p className='text-white flex justify-center font-creepster font-medium text-[1rem]'> Wait 10 seconds for image transformations</p>
            <Button
              onClick={() => { handleTopicSelection('Roman_costume') }}
              id="Ghost"
              variant="outline"
              className="w-32 bg-orange-600 text-white hover:bg-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 font-creepster text-xl"
            >
              Spartan
            </Button>
            <Button
              onClick={() => { handleTopicSelection('Zombie_costume') }}
              id="Witch"
              variant="outline"
              className="w-32 bg-green-600 text-white hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-creepster text-xl"
            >
              Zombie
            </Button>
            <Button
              name='SuperHero'
              onClick={() => { handleTopicSelection('Superhero_costume') }}
              id="SuperHero"
              variant="outline"
              className="w-32 bg-blue-600 text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-creepster text-xl"
            >
              SuperHero
            </Button>
            <Button
              onClick={() => { handleTopicSelection('Devil_costume') }}
              id="Witch"
              variant="outline"
              className="w-32 bg-green-600 text-white hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-creepster text-xl"
            >
              Devil
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;