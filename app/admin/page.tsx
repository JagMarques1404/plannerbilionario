"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase"
import { Database, Target, CheckCircle, AlertCircle, Wifi, Shield, Play } from "lucide-react"

interface TestResult {
  success: boolean
  error?: string
  data?: any
}

export default function AdminPage() {
  const [connectionTest, setConnectionTest] = useState<TestResult | null>(null)
  const [authTest, setAuthTest] = useState<TestResult | null>(null)
  const [sampleDataExists, setSampleDataExists] = useState<boolean | null>(null)
  const [isRunningTests, setIsRunningTests] = useState(false)
  const supabase = createClient()

  const testSupabaseConnection = async (): Promise<TestResult> => {
    try {
      const { data, error } = await supabase.from("users").select("count").limit(1)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  const testAuthentication = async (): Promise<TestResult> => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, session }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
    }
  }

  const checkSampleDataExists = async (): Promise<boolean> => {
    try {
      const { data: users, error } = await supabase
        .from("users")
        .select("id, email")
        .eq("email", "alex@example.com")
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error checking sample data:", error)
        return false
      }

      return !!users
    } catch (error) {
      console.error("Error in checkSampleDataExists:", error)
      return false
    }
  }

  const runConnectionTest = async () => {
    setIsRunningTests(true)
    try {
      const result = await testSupabaseConnection()
      setConnectionTest(result)
    } catch (error) {
      setConnectionTest({ success: false, error: "Test failed" })
    }
  }

  const runAuthTest = async () => {
    try {
      const result = await testAuthentication()
      setAuthTest(result)
    } catch (error) {
      setAuthTest({ success: false, error: "Auth test failed" })
    }
  }

  const checkSampleData = async () => {
    try {
      const exists = await checkSampleDataExists()
      setSampleDataExists(exists)
    } catch (error) {
      console.error("Error checking sample data:", error)
      setSampleDataExists(false)
    } finally {
      setIsRunningTests(false)
    }
  }

  const runAllTests = async () => {
    setIsRunningTests(true)
    await runConnectionTest()
    await runAuthTest()
    await checkSampleData()
  }

  useEffect(() => {
    runAllTests()
  }, [])

  return (
    <div className="min-h-screen gradient-bg p-4">
      <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-200">
          <h1 className="text-3xl font-bold text-gradient mb-2">Julius Invest Admin</h1>
          <p className="text-gray-600">Database management and system diagnostics</p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-900">
                <Wifi className="w-5 h-5 mr-2" />
                Database Connection
              </CardTitle>
              <CardDescription>Supabase connection status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                {connectionTest === null ? (
                  <Badge variant="outline">Testing...</Badge>
                ) : connectionTest.success ? (
                  <Badge className="bg-orange-400 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Failed
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-600">
                <strong>URL:</strong> https://ggifjymotbtowdnoselo.supabase.co
              </div>
              {connectionTest?.error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{connectionTest.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-500">
                <Shield className="w-5 h-5 mr-2" />
                Authentication
              </CardTitle>
              <CardDescription>Supabase Auth system status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                {authTest === null ? (
                  <Badge variant="outline">Testing...</Badge>
                ) : authTest.success ? (
                  <Badge className="bg-yellow-400 text-gray-800">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Working
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Error
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-600">
                <strong>Provider:</strong> Supabase Auth
              </div>
              {authTest?.error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">{authTest.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-600">
                <Database className="w-5 h-5 mr-2" />
                Sample Data
              </CardTitle>
              <CardDescription>Database content status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Status:</span>
                {sampleDataExists === null ? (
                  <Badge variant="outline">Checking...</Badge>
                ) : sampleDataExists ? (
                  <Badge className="bg-blue-900 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Exists
                  </Badge>
                ) : (
                  <Badge variant="secondary">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Missing
                  </Badge>
                )}
              </div>
              <div className="text-xs text-gray-600">
                <strong>Test User:</strong> alex@example.com
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Play className="w-5 h-5 mr-2" />
              System Actions
            </CardTitle>
            <CardDescription>Test and manage your Julius Invest system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={runAllTests} disabled={isRunningTests} className="bg-blue-900 hover:bg-blue-800">
                {isRunningTests ? "Running Tests..." : "Run All Tests"}
              </Button>
              <Button
                onClick={runConnectionTest}
                variant="outline"
                className="border-blue-900 text-blue-900 bg-transparent"
              >
                Test Connection
              </Button>
              <Button
                onClick={runAuthTest}
                variant="outline"
                className="border-orange-400 text-orange-500 bg-transparent"
              >
                Test Auth
              </Button>
              <Button
                onClick={checkSampleData}
                variant="outline"
                className="border-yellow-400 text-yellow-600 bg-transparent"
              >
                Check Sample Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Environment Info */}
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Environment Configuration</CardTitle>
            <CardDescription>Current system configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Supabase Configuration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project URL:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      ggifjymotbtowdnoselo.supabase.co
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Auth Enabled:</span>
                    <Badge className="bg-orange-400 text-white">Yes</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RLS Enabled:</span>
                    <Badge className="bg-yellow-400 text-gray-800">Recommended</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Database Tables</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Users:</span>
                    <Badge variant="outline">✓</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User Missions:</span>
                    <Badge variant="outline">✓</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">User Achievements:</span>
                    <Badge variant="outline">✓</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Quick Setup Guide</CardTitle>
            <CardDescription>Get your Julius Invest application running</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-blue-900">1. Database Setup</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Run SQL scripts in Supabase SQL Editor</li>
                  <li>• Execute scripts 00-09 in order</li>
                  <li>• Verify sample data creation</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-orange-500">2. Test Application</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Visit the login page</li>
                  <li>• Enter any email to create account</li>
                  <li>• Explore dashboard and complete missions</li>
                </ul>
              </div>
            </div>

            <Alert className="border-yellow-200 bg-yellow-50">
              <Target className="h-4 w-4" />
              <AlertDescription>
                <strong>Next Steps:</strong> Once all tests pass, your Julius Invest application is ready for use! Visit
                the main page to start using the gamified financial platform.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
