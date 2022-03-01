import fs from 'fs';

function safeDelete(absolutePath: string): void {

    try {

        // If undefined / null - do nothing:
        if(!absolutePath) return;

        // Only if file exists in disk - try to delete it:
        if(fs.existsSync(absolutePath)) {
            fs.unlinkSync(absolutePath); // Delete file.
        }

    }
    catch(err: any) { // do nothing on fail.
        console.error(err);
    }

}

export default safeDelete;