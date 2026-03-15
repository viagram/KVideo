/**
 * Reusable modal backdrop component - Liquid Glass design
 */

interface ModalBackdropProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ModalBackdrop({ isOpen, onClose }: ModalBackdropProps) {
    return (
        <div
            className={`
                fixed inset-0 z-[9998]
                bg-black/30
                backdrop-blur-[8px]
                [-webkit-backdrop-filter:blur(8px)]
                transition-opacity duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            onClick={onClose}
            aria-hidden="true"
        />
    );
}
