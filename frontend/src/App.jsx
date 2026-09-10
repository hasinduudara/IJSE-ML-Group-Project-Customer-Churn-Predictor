import { useState } from 'react'

// Define the main React component using a function declaration
export default function App() {
  // Initialize state with empty strings to show placeholders
  const [formData, setFormData] = useState({
    tenure: "",
    MonthlyCharges: "",
    TotalCharges: "",
    gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",
    PaperlessBilling: ""
  })

  // State to store the prediction result from the backend
  const [result, setResult] = useState(null)
  
  // State to show loading status while waiting for the API
  const [isLoading, setIsLoading] = useState(false)

  // Configuration array for dynamic form generation with bilingual labels and tooltips
  const formFields = [
    { 
      key: 'tenure', 
      label: 'Tenure (රැඳී සිටි කාලය - මාස ගණන)', 
      placeholder: 'e.g. 12',
      tooltip: 'Tenure (රැඳී සිටි කාලය): පාරිභෝගිකයා සමාගම සමඟ සිටි මාස ගණන (උදා: මාස 12 නම් 12 ලෙස දෙන්න).' 
    },
    { 
      key: 'MonthlyCharges', 
      label: 'Monthly Charges (මාසික ගාස්තුව)', 
      placeholder: 'e.g. 50.5',
      tooltip: 'Monthly Charges (මාසික ගාස්තුව): මාසිකව අය කරන මුදල (උදා: 50.5).' 
    },
    { 
      key: 'TotalCharges', 
      label: 'Total Charges (මුළු ගාස්තුව)', 
      placeholder: 'e.g. 600.0',
      tooltip: 'Total Charges (මුළු ගාස්තුව): මේ දක්වා ගෙවා ඇති සම්පූර්ණ මුදල (උදා: 600.0).' 
    },
    { 
      key: 'gender', 
      label: 'Gender (ස්ත්‍රී/පුරුෂ භාවය)', 
      placeholder: '1 or 0',
      tooltip: 'Gender (ස්ත්‍රී/පුරුෂ භාවය): පිරිමි නම් 1 දෙන්න. ගැහැණු නම් 0 දෙන්න.' 
    },
    { 
      key: 'SeniorCitizen', 
      label: 'Senior Citizen (වැඩිහිටි පුරවැසි)', 
      placeholder: '1 or 0',
      tooltip: 'Senior Citizen (වැඩිහිටි පුරවැසි): වයස අවුරුදු 65 ට වැඩි නම් 1, නැත්නම් 0 දෙන්න.' 
    },
    { 
      key: 'Partner', 
      label: 'Partner (සහකරු/සහකාරිය)', 
      placeholder: '1 or 0',
      tooltip: 'Partner (සහකරු/සහකාරිය): විවාහක හෝ සහකරුවෙකු සිටී නම් 1, නැත්නම් 0 දෙන්න.' 
    },
    { 
      key: 'Dependents', 
      label: 'Dependents (යැපෙන්නන්)', 
      placeholder: '1 or 0',
      tooltip: 'Dependents (යැපෙන්නන්): ළමුන් හෝ යැපෙන්නන් සිටී නම් 1, නැත්නම් 0 දෙන්න.' 
    },
    { 
      key: 'PaperlessBilling', 
      label: 'Paperless Billing (විද්‍යුත් බිල්පත්)', 
      placeholder: '1 or 0',
      tooltip: 'Paperless Billing (විද්‍යුත් බිල්පත්): බිල්පත කොළයක් ලෙස නොමැතිව ඊමේල් ආදියෙන් ලබා ගන්නේ නම් 1, නැත්නම් 0 දෙන්න.' 
    }
  ]

  // Function to handle changes in input fields
  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  // Function to submit data to the backend API
  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    
    // Convert string inputs to decimal numbers for the ML model
    const submitData = {}
    Object.keys(formData).forEach(key => {
      submitData[key] = parseFloat(formData[key])
    })
    
    try {
      // Send a POST request to the FastAPI server
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submitData)
      })
      
      // Save the result from the API
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("API Error:", error)
      setResult({ status: "error", message: "Failed to connect to the server." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    // Main container designed to fill the screen without scrolling (h-screen, overflow-hidden)
    <div className="h-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Main card with a two-column grid layout */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 h-full max-h-[90vh]">
        
        {/* LEFT COLUMN: Data Input Form */}
        <div className="flex flex-col h-full justify-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center md:text-left">
            Customer Churn Predictor
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            {/* Loop through the array to generate form fields dynamically */}
            {formFields.map((field) => (
              <div key={field.key} className="flex flex-col relative z-20">
                <div className="flex items-center mb-1">
                  
                  {/* Bilingual Label with smaller text to save space */}
                  <label className="text-[11px] font-semibold text-gray-700 leading-tight">
                    {field.label}
                  </label>
                  
                  {/* Tooltip Icon and Text Wrapper */}
                  <div className="relative group ml-1 flex items-center cursor-pointer">
                    {/* SVG Info Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5 text-blue-500 hover:text-blue-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                    
                    {/* Hidden text box that appears on mouse hover */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block w-56 p-2 bg-gray-800 text-white text-[10px] rounded shadow-xl z-50 pointer-events-none">
                      {field.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                </div>

                <input
                  type="number"
                  name={field.key}
                  step="any"
                  value={formData[field.key]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                  className="border border-gray-300 rounded p-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                />
              </div>
            ))}

            <div className="col-span-2 mt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? "Predicting..." : "Predict Churn"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Prediction Results and SHAP Explanations */}
        <div className="flex flex-col justify-center bg-gray-50 rounded-lg p-6 border border-gray-200">
          {!result ? (
            // Placeholder state before form submission
            <div className="text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-semibold">Submit data to view predictions</p>
              <p className="text-sm mt-1">(ප්‍රතිඵලය බැලීම සඳහා දත්ත ඇතුළත් කරන්න)</p>
            </div>
          ) : (
            // Display prediction results
            <div className="w-full">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
                Prediction Result <br/>
                <span className="text-sm font-normal text-gray-600">(පුරෝකථන ප්‍රතිඵලය)</span>
              </h2>
              
              <div className={`p-4 rounded-lg font-bold text-lg text-center mb-6 shadow-sm ${
                result.status === 'error' ? 'bg-red-100 text-red-700' :
                result.prediction ? 'bg-orange-100 text-orange-700 border border-orange-300' : 'bg-green-100 text-green-700 border border-green-300'
              }`}>
                {result.status === 'error' ? (
                  <p>{result.message}</p>
                ) : (
                  <>
                    <p>{result.message}</p>
                    <p className="text-sm mt-1 font-medium">
                      {result.prediction ? "(මෙම පාරිභෝගිකයා ඉවත් වීමට ඉඩ ඇත)" : "(මෙම පාරිභෝගිකයා රැඳී සිටීමට ඉඩ ඇත)"}
                    </p>
                  </>
                )}
              </div>

              {/* Dynamically render SHAP explanation reasons if available */}
              {result.reasons && result.reasons.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Key Influencing Factors <br/>
                    <span className="text-sm font-normal text-gray-600">(මෙයට බලපෑ ප්‍රධාන හේතු)</span>
                  </h3>
                  <ul className="space-y-2 mt-3">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="flex items-center bg-white p-3 rounded border border-gray-200 shadow-sm text-gray-700 font-medium">
                        <span className="shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-3">
                          {index + 1}
                        </span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}