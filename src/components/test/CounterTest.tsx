import { useAutoIncrementCounter } from "@/hooks/useAutoIncrementCounter";
import { Button } from "@/components/ui/button";

export const CounterTest = () => {
    // Test with 10 seconds interval for quick testing
    const peopleCount = useAutoIncrementCounter({
        initialCount: 6733,
        incrementAmount: 8,
        intervalHours: 0.00278, // ~10 seconds for testing
        startDate: new Date(Date.now() - 60000).toISOString(), // Started 1 minute ago
    });

    const handleReset = () => {
        alert('This version uses a fixed start date, so reset is not applicable. All users see the same count!');
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Counter Test Page (Synchronized)</h2>

            <div className="bg-gray-100 p-6 rounded-lg mb-4">
                <p className="text-4xl font-bold text-center mb-2">
                    {peopleCount.toLocaleString()}
                </p>
                <p className="text-center text-gray-600">
                    People Joined (Updates every ~10 seconds)
                </p>
            </div>

            <div className="space-y-3">
                <Button
                    onClick={handleReset}
                    className="w-full"
                    variant="outline"
                >
                    About This Counter
                </Button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded">
                <h3 className="font-semibold mb-2">How it works:</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>✅ ALL users see the SAME count at the same time</li>
                    <li>✅ Count is calculated from a fixed start date</li>
                    <li>✅ Increments by 8 every hour (10 sec for testing)</li>
                    <li>✅ No backend needed - pure client-side calculation</li>
                    <li>✅ Works across all browsers and devices</li>
                </ul>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded">
                <h3 className="font-semibold mb-2">Test it:</h3>
                <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Open this page in multiple browsers/devices</li>
                    <li>All will show the exact same count</li>
                    <li>Wait 10 seconds and refresh - count increases by 8</li>
                </ul>
            </div>
        </div>
    );
};
