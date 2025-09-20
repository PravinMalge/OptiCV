import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar'
import { convertPdfToImage } from '~/lib/pdf2image';
import { usePuterStore } from '~/lib/puter';

const Upload = () => {
    const {auth, isLoading, fs, ai, kv} = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string, jobDescription: string, file: File}) => {
        setIsProcessing(true);
        setStatusText('Uploading the file');
        const uploadedFile = await fs.upload([file]);

        if(!uploadedFile) return setStatusText ('Error: Failed to upload file');

        setStatusText('Converting to image ...');
        const imageFile = await convertPdfToImage(file);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;


        if(!file) return;
        handleAnalyze({companyName, jobTitle, jobDescription, file});
    }

  return (
   <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />

    <section className="main-section">
        <div className='page-heading py-16'>
            <h1>Smart feedback for your dream job</h1>
            {isProcessing ? (
                <>
                    <h2>{statusText}</h2>
                    <img src="/images/resume-scan.gif" className='w-full' alt="" />
                </>
            ): (
                <h2>Upload your resume to get AI-powered feedback</h2>
            )}
            {!isProcessing && (
                <form id='upload-form' onSubmit={handleSubmit} className='flex flex-col gap-4 mt-8'>
                    <div className='form-div'>
                        <label htmlFor="company-name">Company Name</label>
                        <input type="text" id="company-name" name="company-name" placeholder='Company Name' />
                    </div>
                    <div className='form-div'>
                        <label htmlFor="job-title"> Job Title</label>
                        <input type="text" id="job-title" name="job-title" placeholder='Job Title' />
                    </div>
                    <div className='form-div'>
                        <label htmlFor="job-description"> Job Description</label>
                        <input type="text" id="job-description" name="job-description" placeholder='Job Description' />
                    </div>
                    <div className='form-div'>
                        <label htmlFor="uploader"> Upload Resume</label>
                        <FileUploader onFileSelect={handleFileSelect} />
                    </div>
                    <button className='primary-button' type='submit'>
                        Analyze Resume
                    </button>
                </form>
            )}
        </div>
    </section>
    </main>
  )
}

export default Upload