import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import { useEffect, useState } from "react";

export default function FingerPrint() {
    const [fingerprint, setFingerprint] = useState<string | null>(null);

    useEffect(() => {
        const fetchFingerprint = async () => {
            const fp = await getFingerprint();
            setFingerprint(fp);
        }

        fetchFingerprint();
    }, []);

    return (
        <div>
            <h1>Your Fingerprint</h1>
            {fingerprint ? <p>{fingerprint}</p> : <p>Loading...</p>}
        </div>
    );
}