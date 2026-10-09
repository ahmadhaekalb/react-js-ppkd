import
{
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

const AppModal = ({
  show,
  onClose,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isLoading = false,
  showFooter = true,
  children,
  title,
}) =>
{
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Silakan isi data user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <div className="">{children}</div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : submitLabel}
            </Button>
            <Button variant="outline" onClick={() => onClose(false)}>
              {cancelLabel}
            </Button>
          </DialogFooter>
        </form>
        
        {/* LEWATI DULU */}

        {/* {showFooter && (
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              {cancelLabel}
            </Button>

            <Button
              type="button"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : submitLabel}
            </Button>
          </div>
        )} */}

        {/* LEWATI DULU */}

      </DialogContent>
    </Dialog>
  );
};

export default AppModal;