import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";

const UploadWidget = ({onUploadSuccess, setpublicId}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'domcloud',
            uploadPreset: 'HACKATON',
            sources: ['local', 'url', 'camera'],
            showAdvancedOptions: true,
            cropping: true,
            multiple: false,
            defaultSource: 'local',

        }, function (error, result) {

       
            console.log(result);
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                onUploadSuccess(result.info.secure_url); 
                setpublicId(result.info.public_id);

            }
          
        });

    }, [onUploadSuccess])

    return (
        
         <div className="flex justify-center">
              <Button
               onClick={() => widgetRef.current.open()}
                variant="outline"
                className="bg-purple-700 text-white hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 font-creepster text-xl"
              >
                <label htmlFor="imageUpload" className="cursor-pointer">
                  Upload Spooky Image
                </label>
              
              </Button>
              

        </div>
    )

}



export default UploadWidget;