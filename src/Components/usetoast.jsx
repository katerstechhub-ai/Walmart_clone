import { useState } from "react";

function useToast() {
    let [toasts, setToasts] = useState([]);

    function showToast(message, type = "success") {
        let id = Date.now();
        setToasts(function(prev) { return [...prev, { id, message, type }]; });
        setTimeout(function() {
            setToasts(function(prev) { return prev.filter(function(t) { return t.id !== id; }); });
        }, 3500);
    }

    return { toasts, showToast };
}

export default useToast;